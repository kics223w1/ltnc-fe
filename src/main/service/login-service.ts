import { ipcMain } from 'electron';
import {
  EVENTS_FROM_MAIN_PROCESS,
  LOGIN_SERVICE,
  ROLE,
} from '../models/constants';
import notificationService from './notification-service';

class LoginService {
  private userRole: ROLE | undefined;

  constructor() {}

  private setUserRole(role: ROLE | undefined) {
    this.userRole = role;

    notificationService.sendNotificationToMainWindows(
      EVENTS_FROM_MAIN_PROCESS.ON_UPDATE_USER_ROLE,
      {
        role: this.userRole,
      }
    );
  }

  private async login(account: string, password: string) {
    // Call API to login
  }

  private async logout() {
    // Call API to login
  }

  private notifyRenderer(isLoggedIn: boolean) {
    // Notify to renderer process
  }

  public listenEventsFromRendererProcess() {
    ipcMain.on(
      LOGIN_SERVICE.LOGIN,
      (
        event,
        args: {
          account: string;
          password: string;
        }
      ) => {
        this.login(args.account, args.password);
      }
    );

    ipcMain.on(LOGIN_SERVICE.LOGOUT, (event, args: {}) => {
      this.logout();
    });
  }
}

export default new LoginService();
