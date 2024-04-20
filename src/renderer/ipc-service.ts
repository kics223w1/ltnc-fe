import { WINDOWS } from '../main/models/constantss';
import { NOTIFICATION_SERVICE } from '../main/models/constants';

export const openDialog = (windowID: WINDOWS) => {
  window.electron.ipcRenderer.sendMessage(NOTIFICATION_SERVICE.ON_SHOW_DIALOG, {
    windowID,
  });
};
