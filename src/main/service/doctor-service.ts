import { ipcMain } from 'electron';
import Doctor from '../models/doctor';
import { DOCTOR_SERVICE } from '../models/constants';
import networkService from './network-service';

class DoctorService {
  private doctors: Doctor[];

  constructor() {
    this.doctors = [];
  }

  private async loadDoctors() {
    this.doctors = await networkService.getDoctors();
  }

  public async loadDataAtLaunch() {
    try {
      await Promise.all([this.loadDoctors()]);
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  public listenEventsFromRendererProcess() {
    ipcMain.handle(DOCTOR_SERVICE.RELOAD_DOCTORS, async (event, args) => {
      await this.loadDoctors();
      return this.doctors;
    });
  }
}

export default new DoctorService();
