import { ipcMain } from 'electron';
import {
  EVENTS_FROM_MAIN_PROCESS,
  LOGIN_SERVICE,
  ROLE,
} from '../models/constants';
import notificationService from './notification-service';

const adminAccount = {
  account: 'admin',
  password: 'admin',
};

const doctorAccount = {
  account: 'doctor',
  password: 'doctor',
};

const nurseAccount = {
  account: 'nurse',
  password: 'nurse',
};

const patientAccount = {
  account: 'patient',
  password: 'patient',
};

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
    if (
      account === adminAccount.account &&
      password === adminAccount.password
    ) {
      this.setUserRole(ROLE.ADMIN);
      return;
    }

    if (
      account === doctorAccount.account &&
      password === doctorAccount.password
    ) {
      this.setUserRole(ROLE.DOCTOR);
      return;
    }

    if (
      account === nurseAccount.account &&
      password === nurseAccount.password
    ) {
      this.setUserRole(ROLE.NURSE);
      return;
    }

    if (
      account === patientAccount.account &&
      password === patientAccount.password
    ) {
      this.setUserRole(ROLE.PATIENT);
      return;
    }

    this.setUserRole(undefined);
  }

  private async logout() {
    // Call API to login
    this.setUserRole(undefined);
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
