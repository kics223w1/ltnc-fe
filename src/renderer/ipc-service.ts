import { WINDOWS } from './models/constants';
import { NOTIFICATION_SERVICE } from '/main/models/constant';

export const openDialog = (windowID: WINDOWS) => {
  window.electron.ipcRenderer.sendMessage(NOTIFICATION_SERVICE.ON_SHOW_DIALOG, {
    windowID,
  });
};
