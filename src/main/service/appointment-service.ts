import { ipcMain } from 'electron';
import { APPOINTMENT_SERVICE, APPOINTMENT_STATUS } from '../models/constants';
import axios from 'axios';
import loginService from './login-service';
import Appointment from '../models/appointment';

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
      const result: {
        email: string;
        user_id: string;
        user_name: string;
      }[] = response.data ? response.data : [];
      return result;
    } catch (e) {
      return [];
    }
  }

  public async bookAppointment(
    date: string,
    min_appointment_number: number,
    max_appointment_number: number,
    doctor_id: string
  ) {
    try {
      const response = await this.instance.post(
        `/appointments?doctor_id=${doctor_id}`,
        {
          date,
          min_appointment_number,
          max_appointment_number,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loginService.getAccessToken()}`,
          },
        }
      );

      console.log('Response:', response.data);

      return 'Success!';
    } catch (e) {
      console.error('Error:', e);
      return 'Failed!';
    }
  }

  public async getAppointments(
    status: APPOINTMENT_STATUS
  ): Promise<Appointment[]> {
    try {
      const response = await this.instance.get(`/appointments?src=${status}`, {
        headers: {
          Authorization: `Bearer ${loginService.getAccessToken()}`,
        },
      });

      const result = response.data ? response.data : [];
      return result.flatMap((appointment: any) => {
        return [Appointment.fromJSON(appointment)];
      });
    } catch (e) {
      return [];
    }
  }

  public async cancelAppointment(appointment_id: number) {
    try {
      const response = await this.instance.patch(
        `/appointments/${appointment_id}/cancel`,
        undefined,
        {
          headers: {
            Authorization: `Bearer ${loginService.getAccessToken()}`,
          },
        }
      );

      return 'Success!';
    } catch (e) {
      console.error('Error:', e);
      return 'Failed!';
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

    ipcMain.handle(
      APPOINTMENT_SERVICE.BOOK_APPOINTMENT,
      async (event, args) => {
        console.log('Args:', args);

        return await this.bookAppointment(
          args.date,
          args.min_appointment_number,
          args.max_appointment_number,
          args.doctor_id
        );
      }
    );

    ipcMain.handle(
      APPOINTMENT_SERVICE.GET_APPOINTMENTS,
      async (event, args) => {
        return await this.getAppointments(args.status);
      }
    );

    ipcMain.handle(
      APPOINTMENT_SERVICE.CANCEL_APPOINTMENT,
      async (event, args) => {
        return await this.cancelAppointment(args.appointment_id);
      }
    );
  }
}

export default new AppointmentService();
