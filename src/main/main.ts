/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import {
  app,
  BrowserWindow,
  shell,
  screen,
  nativeTheme,
  ipcMain,
} from 'electron';
import { getAssetPath } from './models/app-directory';
import { EVENTS_FROM_MAIN_PROCESS, OS_PLATFORM } from './models/constants';
import { getOSPlatform, resolveHtmlPath } from './utils';
import notificationService from './service/notification-service';
import { listenEventsFromRendererProcess } from '.';
import machineService from './service/machine-service';
import medicineService from './service/medicine-service';
import userService from './service/user-service';
import managementService from './service/management-service';
import loginService from './service/login-service';

let mainWindow: BrowserWindow | null = null;

nativeTheme.themeSource = 'dark';

listenEventsFromRendererProcess();

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

ipcMain.on(EVENTS_FROM_MAIN_PROCESS.ON_CLOSE_APP, (event, arg) => {
  app.quit();
});

ipcMain.on(EVENTS_FROM_MAIN_PROCESS.ON_TOGGLE_FULL_SCREEN, (event, arg) => {
  if (mainWindow) {
    mainWindow.setFullScreen(!mainWindow.isFullScreen());
  }
});

ipcMain.on(EVENTS_FROM_MAIN_PROCESS.ON_MINIMIZE_APP, (event, arg) => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const screenWidth = screen.getPrimaryDisplay().workAreaSize.width;
  const screenHeight = screen.getPrimaryDisplay().workAreaSize.height;

  // get app icon
  let appIcon;
  if (getOSPlatform() === OS_PLATFORM.LINUX) {
    // on Linux, AppImage doens't include the appicon if it's *.ico
    // Use .png to fix it
    // https://stackoverflow.com/questions/57543680/electron-linux-appimage-is-not-showing-the-icon-while-deb-is
    appIcon = getAssetPath('icons/icon256x256.png');
  } else {
    // Default mode for Windows / macOS
    appIcon = getAssetPath('icon.ico');
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: screenWidth - 100,
    height: screenHeight - 50,
    minWidth: 800,
    minHeight: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', async () => {
    // Start the proxy server after the window is displayed!
    if (mainWindow) {
      console.log('✅ Window is ready to show');
    } else {
      throw new Error('"mainWindow" is not defined');
    }

    // Show main windows
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }

    // For the data can be lazy loading, let's load if after the mainWindow is opened
    if (mainWindow) {
      await Promise.all([
        userService.loadDataAtLaunch(),
        machineService.loadDataAtLaunch(),
        medicineService.loadDataAtLaunch(),
        managementService.loadDataAtLaunch(),
        loginService.loadLogicAtLaunch(),
      ]);
    }
  });

  mainWindow.on('closed', async () => {
    console.log('✅ Window on closed!');

    // release all memory
    mainWindow = null;
  });

  mainWindow.on('resized', () => {
    if (!mainWindow) {
      return;
    }
    const sizes = mainWindow.getSize();
    if (sizes.length !== 2) {
      return;
    }
  });

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Disable all default shortcuts of Electron (e.g. Ctrl+W)
  mainWindow.setMenu(null);

  notificationService.setMainWindow(mainWindow);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    console.log('👉 App Start!');
    console.log('App path = ' + app.getPath('userData'));

    app.on('activate', () => {
      console.log('👉 Main window is activate!!!');

      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows openn
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
