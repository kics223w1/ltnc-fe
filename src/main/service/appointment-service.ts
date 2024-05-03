import { ipcMain } from 'electron';
import { APPOINTMENT_SERVICE } from '../models/constants';
import axios from 'axios';
import loginService from './login-service';

class AppointmentService {
  private instance: any;

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://helped-alpaca-obliging.ngrok-free.app',
    });
  }

  public async getFreeDoctors(
    date: string,
    min_appointment_number: number,
    max_appointment_number: number
  ) {
    try {
      const response = await this.instance.get(
        `/appointments/freeDoctor?date=${date}&min_appointment_number=${min_appointment_number}&max_appointment_number=${max_appointment_number}`,
        {
          headers: {
            Authorization: `Bearer ${loginService.getAccessToken()}`,
          },
        }
      );

      console.log('Response:', response);

      return response.data ? response.data : [];
    } catch (e) {
      console.error('Error:', e);

      return [];
    }
  }

  public listenEventsFromRendererProcess() {
    ipcMain.handle(APPOINTMENT_SERVICE.GET_FREE_DOCTORS, (event, args) => {
      return this.getFreeDoctors(
        args.date,
        args.min_appointment_number,
        args.max_appointment_number
      );
    });
  }
}

export default new AppointmentService();
