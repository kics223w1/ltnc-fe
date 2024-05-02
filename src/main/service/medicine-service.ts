import { ipcMain } from 'electron';
import { MEDICINE_SERVICE } from '../models/constants';
import Medicine from '../models/medicine';
import networkService from './network-service';
import axios from 'axios';

class MedicineService {
  private medicines: Medicine[];
  private instance: any;

  constructor() {
    this.medicines = [];

    this.instance = axios.create({
      baseURL: 'https://helped-alpaca-obliging.ngrok-free.app',
    });
  }

  public async loadMedicines() {
    const medicines = await networkService.getMedicines();
    this.medicines = medicines;
  }

  private async updateMedicineCost(id: string, cost: number) {
    try {
      const body = {
        cost,
      };
      const response = await this.instance.patch(`/medicine/cost/${id}`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response:', response);
      return 'Success!';
    } catch (e) {
      console.error('Error:', e);
      return 'Cập nhật không thành công';
    }
  }

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

    ipcMain.handle(
      MEDICINE_SERVICE.EDIT_MEDICINE_COST,
      async (
        event,
        args: {
          id: string;
          cost: number;
        }
      ) => {
        return await this.updateMedicineCost(args.id, args.cost);
      }
    );

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
