import { ipcMain } from 'electron';
import { PATIENT_SERVICE } from '../models/constants';
import networkService from './network-service';
import Patient from '../models/patient';
import Examination from '../models/examination';

class PatientService {
  private patients: Patient[];
  private examinations: Examination[];

  constructor() {
    this.patients = [];
    this.examinations = [];
  }

  private async loadPatients() {
    this.patients = await networkService.getPatients();
  }

  private async loadExaminations() {
    this.examinations = await networkService.getExaminations('4');
  }

  public async loadDataAtLaunch() {
    try {
      await Promise.all([this.loadPatients()]);
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  public listenEventsFromRendererProcess() {
    ipcMain.handle(PATIENT_SERVICE.RELOAD_PATIENTS, async (event, args) => {
      await this.loadPatients();
      return this.patients;
    });

    ipcMain.handle(PATIENT_SERVICE.RELOAD_EXAMINATIONS, async (event, args) => {
      await this.loadExaminations();
      return this.examinations;
    });
  }
}

export default new PatientService();
