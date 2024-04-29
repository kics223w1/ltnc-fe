import { ipcMain } from 'electron';
import { MEDICINE_SERVICE } from '../models/constants';
import Medicine from '../models/medicine';
import networkService from './network-service';

class MedicineService {
  private medicines: Medicine[];

  constructor() {
    this.medicines = [];
  }

  private async loadMedicines() {
    const medicines = await networkService.getMedicines();
    this.medicines = medicines;
  }

  private async editMedicine(medicine: Medicine) {}

  public async loadDataAtLaunch() {
    try {
      await Promise.all([this.loadMedicines()]);
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  public listenEventsFromRendererProcess() {
    ipcMain.handle(MEDICINE_SERVICE.GET_MEDICINES_1, (event, args) => {
      return this.medicines;
    });

    ipcMain.handle(MEDICINE_SERVICE.RELOAD_MEDICINES, async (event, args) => {
      await this.loadMedicines();
      return this.medicines;
    });

    ipcMain.on(
      MEDICINE_SERVICE.EDIT_MEDICINES,
      (
        event,
        args: {
          medicine: Medicine;
        }
      ) => {}
    );
  }
}

export default new MedicineService();