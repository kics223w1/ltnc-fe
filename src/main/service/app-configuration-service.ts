import { APP_CONFIG_KEY } from '../models/constants';

const Store = require('electron-store');

class AppConfigurationService {
  private store: any;

  constructor() {
    this.store = new Store();
  }

  public setConfig(key: APP_CONFIG_KEY, value: any): void {
    try {
      this.store.set(key, value);
    } catch (e: any) {
      console.error(
        'Save config failed on ' + key + ', error message: ' + e.message
      );
    }
  }

  public setConfigs(keys: APP_CONFIG_KEY[], values: any[]): void {
    if (keys.length !== values.length) {
      return;
    }

    keys.forEach((key, index) => {
      this.setConfig(key, values[index]);
    });
  }

  public removeConfig(key: APP_CONFIG_KEY): void {
    this.store.delete(key);
  }

  public getConfig(key: APP_CONFIG_KEY): any {
    const value = this.store.get(key);
    if (value === undefined) {
      return this.defaultValue(key);
    }
    return value;
  }

  public getConfigs(keys: APP_CONFIG_KEY[]): { [key: string]: any } {
    const obj: { [key: string]: any } = {};
    keys.forEach((key) => {
      obj[key] = this.getConfig(key);
    });
    return obj;
  }

  private defaultValue(key: APP_CONFIG_KEY): any {
    switch (key) {
      case APP_CONFIG_KEY.USER_OBJECT:
      case APP_CONFIG_KEY.START_TIME_REMEMBER_ME:
        return undefined;
      default:
        return undefined;
    }
  }
}

export default new AppConfigurationService();
