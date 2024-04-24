import { ipcMain } from 'electron';
import {
  APP_CONFIG_KEY,
  EVENTS_FROM_MAIN_PROCESS,
  LOGIN_SERVICE,
  ROLE,
} from '../models/constants';
import notificationService from './notification-service';
import appConfigurationService from './app-configuration-service';

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

  private async login(account: string, password: string, rememberMe: boolean) {
    // Call API to login
    if (
      account === adminAccount.account &&
      password === adminAccount.password
    ) {
      this.setUserRole(ROLE.ADMIN);
      this.saveUserObject(account, password, rememberMe);
      return;
    }

    if (
      account === doctorAccount.account &&
      password === doctorAccount.password
    ) {
      this.setUserRole(ROLE.DOCTOR);
      this.saveUserObject(account, password, rememberMe);
      return;
    }

    if (
      account === nurseAccount.account &&
      password === nurseAccount.password
    ) {
      this.setUserRole(ROLE.NURSE);
      this.saveUserObject(account, password, rememberMe);
      return;
    }

    if (
      account === patientAccount.account &&
      password === patientAccount.password
    ) {
      this.setUserRole(ROLE.PATIENT);
      this.saveUserObject(account, password, rememberMe);
      return;
    }

    // Update comments...

    this.setUserRole(undefined);
    this.saveUserObject(account, password, false);
  }

  public saveUserObject(
    account: string,
    password: string,
    rememberMe: boolean
  ) {
    if (!rememberMe) {
      appConfigurationService.removeConfig(
        APP_CONFIG_KEY.START_TIME_REMEMBER_ME
      );
      appConfigurationService.removeConfig(APP_CONFIG_KEY.USER_OBJECT);
      return;
    }

    appConfigurationService.setConfig(
      APP_CONFIG_KEY.START_TIME_REMEMBER_ME,
      new Date().getTime()
    );

    const encodedAccount = Buffer.from(account).toString('base64');
    const encodedPassword = Buffer.from(password).toString('base64');
    appConfigurationService.setConfig(
      APP_CONFIG_KEY.USER_OBJECT,
      `${encodedAccount}__${encodedPassword}`
    );
  }

  public loadLogicAtLaunch() {
    const userObject = appConfigurationService.getConfig(
      APP_CONFIG_KEY.USER_OBJECT
    );
    const startTimeRememberMe = appConfigurationService.getConfig(
      APP_CONFIG_KEY.START_TIME_REMEMBER_ME
    );
    if (!userObject) {
      return;
    }

    const [encodedAccount, encodedPassword] = userObject.split('__');
    const account = Buffer.from(encodedAccount, 'base64').toString('utf-8');
    const password = Buffer.from(encodedPassword, 'base64').toString('utf-8');

    // Update comments...
    if (
      startTimeRememberMe &&
      new Date().getTime() - startTimeRememberMe >= 31 * 24 * 60 * 60 * 1000
    ) {
      this.saveUserObject(account, password, false);
      return;
    }

    this.login(account, password, true);
  }

  private async logout() {
    // Call API to login
    this.userRole = undefined;
    this.saveUserObject('', '', false);
  }

  public listenEventsFromRendererProcess() {
    ipcMain.handle(LOGIN_SERVICE.GET_USER_ROLE, async (event, args: {}) => {
      return this.userRole;
    });

    ipcMain.on(
      LOGIN_SERVICE.LOGIN,
      (
        event,
        args: {
          account: string;
          password: string;
          rememberMe: boolean;
        }
      ) => {
        this.login(args.account, args.password, args.rememberMe);
      }
    );

    ipcMain.on(LOGIN_SERVICE.LOGOUT, (event, args: {}) => {
      this.logout();
    });
  }
}

export default new LoginService();
