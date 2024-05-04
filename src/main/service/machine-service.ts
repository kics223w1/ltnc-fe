import { ipcMain } from 'electron';
import { MACHINE_SERVICE } from '../models/constants';
import Machine from '../models/machine';
import networkService from './network-service';
import axios from 'axios';
import loginService from './login-service';
import { MachineBodyAdd } from '../types';

class MachineService {
  private machines: Machine[];
  private instance: any;

  constructor() {
    this.machines = [];

    this.instance = axios.create({
      baseURL: 'https://helped-alpaca-obliging.ngrok-free.app',
    });
  }

  public async loadMachines() {
    const machines = await networkService.getMachines();
    this.machines = machines;
  }

  public async addMachine(body: MachineBodyAdd) {
    try {
      await this.instance.post('/machines', body, {
        headers: {
          Authorization: `Bearer ${loginService.getAccessToken()}`,
        },
      });
      return 'Success!';
    } catch (e) {
      console.error('Error:', e);
      return 'Failed';
    }
  }

  public async editMachine(id: string, body: MachineBodyAdd) {
    try {
      await this.instance.patch(`/machines/${id}`, body, {
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

  public async deleteMachine(id: string) {
    try {
      await this.instance.delete(`/machines/${id}`, {
        headers: {
          Authorization: `Bearer ${loginService.getAccessToken()}`,
        },
      });
      return 'Success!';
    } catch (e) {
      console.error('Error:', e);
      return 'Failed';
    }
  }

  public async loadDataAtLaunch() {
    try {
      await Promise.all([this.loadMachines()]);
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  public listenEventsFromRendererProcess() {
    ipcMain.handle(MACHINE_SERVICE.GET_MACHINES, (event, args) => {
      return this.machines;
    });

    ipcMain.handle(MACHINE_SERVICE.RELOAD_MACHINES, async (event, args) => {
      await this.loadMachines();
      return this.machines;
    });

    ipcMain.handle(MACHINE_SERVICE.ADD_MACHINE, async (event, args) => {
      return await this.addMachine(args.body);
    });

    ipcMain.handle(MACHINE_SERVICE.DELETE_MACHINE, async (event, args) => {
      return await this.deleteMachine(args.id);
    });

    ipcMain.handle(MACHINE_SERVICE.EDIT_MACHINE, async (event, args) => {
      return await this.editMachine(args.id, args.body);
    });
  }
}

export default new MachineService();
