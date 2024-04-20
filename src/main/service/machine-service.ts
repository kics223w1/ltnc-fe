import { ipcMain } from 'electron';
import { MACHINE_SERVICE } from '../models/constants';
import Machine from '../models/machine';
import networkService from './network-service';

class MachineService {
  private machines: Machine[];

  constructor() {
    this.machines = [];
  }

  private async loadMachines() {
    const machines = await networkService.getMachines();
    this.machines = machines;
  }

  private async editMachine(machine: Machine) {}

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

    ipcMain.on(
      MACHINE_SERVICE.EDIT_MACHINE,
      (
        event,
        args: {
          machine: Machine;
        }
      ) => {}
    );
  }
}

export default new MachineService();
