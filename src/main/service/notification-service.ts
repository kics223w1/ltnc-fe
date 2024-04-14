import { BrowserWindow, ipcMain } from 'electron';
import {
  EVENTS_FROM_MAIN_PROCESS,
  MAIN_VIEW_TAB,
  NOTIFICATION_SERVICE,
} from '../models/constant';
import { WINDOWS } from '/renderer/models/constants';

class NotificationService {
  private mainWindow: BrowserWindow | undefined;

  constructor() {}

  setMainWindow(window: BrowserWindow | undefined) {
    this.mainWindow = window;
  }

  sendNotificationToMainWindows(event: any, arg: any) {
    if (!this.mainWindow) {
      return;
    }
    // Prevent an error when sending a icp message to invalid windows
    if (this.mainWindow.isDestroyed()) {
      return;
    }

    this.mainWindow.webContents.send(event, arg);
  }

  public listenEventsFromRendererProcess() {
    ipcMain.on(
      NOTIFICATION_SERVICE.ON_SHOW_DIALOG,
      (
        event,
        args: {
          windowID: WINDOWS;
        }
      ) => {
        console.log(
          '✅ NotificationService: listenEventsFromRendererProcess: ON_SHOW_DIALOG'
        );

        this.sendNotificationToMainWindows(
          EVENTS_FROM_MAIN_PROCESS.ON_SHOW_DIALOG,
          args.windowID
        );
      }
    );

    ipcMain.on(
      EVENTS_FROM_MAIN_PROCESS.ON_UPDATE_MAIN_VIEW,
      (
        event,
        args: {
          tab: MAIN_VIEW_TAB;
        }
      ) => {
        this.sendNotificationToMainWindows(
          EVENTS_FROM_MAIN_PROCESS.ON_UPDATE_MAIN_VIEW,
          args.tab
        );
      }
    );
  }
}

export default new NotificationService();
