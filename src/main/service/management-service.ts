import { ipcMain } from 'electron';
import networkService from './network-service';
import { MANAGEMENT_SERVICE } from '../models/constants';
import Medicine from '../models/medicine';

class ManagementService {
  private medicines: Medicine[];

  constructor() {
    this.medicines = [];
  }

  private async getExaminations() {
    return await networkService.getExaminations('1');
  }

  public async loadMedicines() {
    this.medicines = await networkService.getMedicines();
  }

  public async loadDataAtLaunch() {
    await Promise.all([this.loadMedicines()]);
  }

  public listenEventsFromRendererProcess() {
    ipcMain.handle(MANAGEMENT_SERVICE.GET_EXAMINATIONS, async (event, args) => {
      return await this.getExaminations();
    });

    ipcMain.handle(MANAGEMENT_SERVICE.GET_MEDICINES, (event, args) => {
      return this.medicines;
    });
  }
}

export default new ManagementService();
