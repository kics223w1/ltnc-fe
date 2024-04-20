import { ipcMain } from 'electron';
import Doctor from '../models/doctor';
import networkService from './network-service';
import Nurse from '../models/nurse';
import Patient from '../models/patient';
import { USER_SERVICE } from '../models/constants';

class UserService {
  private doctors: Doctor[];
  private nurse: Nurse[];
  private patients: Patient[];

  constructor() {
    this.doctors = [];
    this.nurse = [];
    this.patients = [];
  }

  private async loadDoctors() {
    this.doctors = await networkService.getDoctors();
  }

  private async loadNurses() {
    this.nurse = await networkService.getNurses();
  }

  private async loadPatients() {
    this.patients = await networkService.getPatients();
  }

  public async loadDataAtLaunch() {
    try {
      await Promise.all([
        this.loadDoctors(),
        this.loadNurses(),
        this.loadPatients(),
      ]);
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  public listenEventsFromRendererProcess() {
    ipcMain.handle(USER_SERVICE.GET_DOCTORS, (event, args) => {
      return this.doctors;
    });

    ipcMain.handle(USER_SERVICE.GET_NURSES, (event, args) => {
      return this.nurse;
    });

    ipcMain.handle(USER_SERVICE.GET_PATIENTS, (event, args) => {
      return this.patients;
    });

    ipcMain.handle(USER_SERVICE.RELOAD_DOCTORS, async (event, args) => {
      await this.loadDoctors();
      return this.doctors;
    });

    ipcMain.handle(USER_SERVICE.RELOAD_NURSES, async (event, args) => {
      await this.loadNurses();
      return this.nurse;
    });

    ipcMain.handle(USER_SERVICE.RELOAD_PATIENTS, async (event, args) => {
      await this.loadPatients();
      return this.patients;
    });
  }
}

export default new UserService();
