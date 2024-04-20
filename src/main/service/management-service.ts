import { ipcMain } from 'electron';
import networkService from './network-service';
import { MANAGEMENT_SERVICE } from '../models/constants';

class ManagementService {
  constructor() {}

  private async getExaminations() {
    return await networkService.getExaminations('1');
  }

  public listenEventsFromRendererProcess() {
    ipcMain.handle(MANAGEMENT_SERVICE.GET_EXAMINATIONS, async (event, args) => {
      return await this.getExaminations();
    });
  }
}

export default new ManagementService();
