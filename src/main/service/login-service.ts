import { ipcMain } from 'electron';
import {
  APP_CONFIG_KEY,
  EVENTS_FROM_MAIN_PROCESS,
  LOGIN_SERVICE,
  ROLE,
} from '../models/constants';
import notificationService from './notification-service';
import appConfigurationService from './app-configuration-service';
import axios from 'axios';
import { SignInResponse, UserResponseErrorMessage } from '../types';
import User from '../models/user';

class LoginService {
  private user: User | undefined;
  private instance: any;

  private access_token: string;

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://helped-alpaca-obliging.ngrok-free.app',
    });

    this.access_token = '';
  }

  private setAccessToken(access_token: string) {
    this.access_token = access_token;
  }

  public getAccessToken() {
    return this.access_token;
  }

  private setUser(user: User | undefined) {
    this.user = user;

    notificationService.sendNotificationToMainWindows(
      EVENTS_FROM_MAIN_PROCESS.ON_UPDATE_USER,
      {
        user,
      }
    );
  }

  private async signIn(email: string, password: string, rememberMe: boolean) {
    try {
      const response = await this.instance.post('/auth/signIn', {
        email,
        password,
      });
      const obj = response.data as SignInResponse;

      this.setUser(obj.user);
      this.saveUserObject(email, password, rememberMe);
      this.setAccessToken(obj.tokens.access_token);

      return 'Success!';
    } catch (e: any) {
      console.log('Error: ', e);

      return 'Unknown error';
    }
  }

  private async signup(
    email: string,
    user_name: string,
    password: string
  ): Promise<string> {
    try {
      await this.instance.post('/auth/signup', {
        email,
        user_name,
        password,
        role: ROLE.PATIENT,
      });
      return 'Success!';
    } catch (e: any) {
      const obj: UserResponseErrorMessage | undefined = e.response
        ? e.response.data
        : undefined;
      if (obj) {
        return obj.message.length > 0 ? obj.message[0] : 'Unknown error';
      }
      return 'Unknown error';
    }
  }

  public saveUserObject(email: string, password: string, rememberMe: boolean) {
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

    const encodedEmail = Buffer.from(email).toString('base64');
    const encodedPassword = Buffer.from(password).toString('base64');
    appConfigurationService.setConfig(
      APP_CONFIG_KEY.USER_OBJECT,
      `${encodedEmail}__${encodedPassword}`
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
    const email = Buffer.from(encodedAccount, 'base64').toString('utf-8');
    const password = Buffer.from(encodedPassword, 'base64').toString('utf-8');

    // Update comments...
    if (
      startTimeRememberMe &&
      new Date().getTime() - startTimeRememberMe >= 31 * 24 * 60 * 60 * 1000
    ) {
      this.saveUserObject(email, password, false);
      return;
    }

    this.signIn(email, password, true);
  }

  private async logout() {
    this.setUser(undefined);
    this.saveUserObject('', '', false);

    await this.instance.post('/auth/logout', {});
  }

  public listenEventsFromRendererProcess() {
    ipcMain.handle(LOGIN_SERVICE.GET_USER, async (event, args: {}) => {
      return this.user;
    });

    ipcMain.handle(
      LOGIN_SERVICE.SIGN_UP,
      async (
        event,
        args: {
          email: string;
          user_name: string;
          password: string;
        }
      ) => {
        return await this.signup(args.email, args.user_name, args.password);
      }
    );

    ipcMain.handle(
      LOGIN_SERVICE.SIGN_IN,
      async (
        event,
        args: {
          email: string;
          password: string;
          rememberMe: boolean;
        }
      ) => {
        return await this.signIn(args.email, args.password, args.rememberMe);
      }
    );

    ipcMain.handle(LOGIN_SERVICE.RELOAD_USER, async (event, args: {}) => {
      await this.loadLogicAtLaunch();
      return this.user;
    });

    ipcMain.on(LOGIN_SERVICE.LOGOUT, (event, args: {}) => {
      this.logout();
    });
  }
}

export default new LoginService();
