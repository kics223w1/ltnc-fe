import { ipcMain } from 'electron';
import { MEDICINE_SERVICE } from '../models/constants';
import Medicine from '../models/medicine';
import networkService from './network-service';
import axios from 'axios';
import MedicineHistory from '../models/medicine-history';
import loginService from './login-service';
import Batch from '../models/batch';
import { BatchBodyAdd, MedicineBodyAdd } from '../types';

class MedicineService {
  private medicines: Medicine[];
  private batches: Batch[];
  private instance: any;

  constructor() {
    this.medicines = [];
    this.batches = [];

    this.instance = axios.create({
      baseURL: 'https://helped-alpaca-obliging.ngrok-free.app',
    });
  }

  public async loadMedicines() {
    const medicines = await networkService.getMedicines();
    this.medicines = medicines;
  }

  public async loadBatches() {
    const batches = await networkService.getBatches();
    this.batches = batches;
  }

  public async addMedicine(body: MedicineBodyAdd) {
    try {
      await this.instance.post('/medicine', body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loginService.getAccessToken()}`,
        },
      });
      return 'Success!';
    } catch (e) {
      console.error('Error:', e);
      return 'Failed';
    }
  }

  public async addBatch(body: BatchBodyAdd) {
    try {
      await this.instance.post('/medicine/batch', body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loginService.getAccessToken()}`,
        },
      });
      return 'Success!';
    } catch (e) {
      console.error('Error:', e);
      return 'Failed';
    }
  }

  public async updateMedicineCost(id: string, cost: number) {
    try {
      const body = {
        cost,
      };
      const response = await this.instance.patch(`/medicine/cost/${id}`, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loginService.getAccessToken()}`,
        },
      });
      console.log('Response:', response);
      return 'Success!';
    } catch (e) {
      console.error('Error:', e);
      return 'Cập nhật không thành công';
    }
  }

  public async getMedicineLog(id: string): Promise<MedicineHistory[]> {
    try {
      const response = await this.instance.get(`/medicine/log/${id}`, {
        headers: {
          Authorization: `Bearer ${loginService.getAccessToken()}`,
        },
      });
      return response.data ? response.data : [];
    } catch (e) {
      console.error('Error:', e);
      return [];
    }
  }

  public async loadDataAtLaunch() {
    try {
      await Promise.all([this.loadMedicines(), this.loadBatches()]);
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  public listenEventsFromRendererProcess() {
    ipcMain.handle(MEDICINE_SERVICE.GET_MEDICINES, async (event, args) => {
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

    ipcMain.handle(MEDICINE_SERVICE.ADD_MEDICINE, async (event, args) => {
      return await this.addMedicine(args.body);
    });

    ipcMain.handle(MEDICINE_SERVICE.RELOAD_MEDICINES, async (event, args) => {
      await this.loadMedicines();
      return this.medicines;
    });

    ipcMain.handle(MEDICINE_SERVICE.GET_MEDICINE_LOG, async (event, args) => {
      return await this.getMedicineLog(args.id);
    });

    ipcMain.handle(MEDICINE_SERVICE.GET_BATCHES, async (event, args) => {
      return this.batches;
    });

    ipcMain.handle(MEDICINE_SERVICE.RELOAD_BATCHES, async (event, args) => {
      await this.loadBatches();
      return this.batches;
    });

    ipcMain.handle(MEDICINE_SERVICE.ADD_BATCH, async (event, args) => {
      return await this.addBatch(args.body);
    });
  }
}

export default new MedicineService();
