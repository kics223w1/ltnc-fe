import { ipcMain } from 'electron';
import Doctor from '../models/doctor';
import networkService from './network-service';
import Nurse from '../models/nurse';
import Patient from '../models/patient';
import { ROLE, USER_SERVICE } from '../models/constants';
import axios from 'axios';
import { BodyUpdateUser, UserResponseErrorMessage } from '../types';
import loginService from './login-service';

class UserService {
  private doctors: Doctor[];
  private nurse: Nurse[];
  private patients: Patient[];

  private instance: any;

  constructor() {
    this.doctors = [];
    this.nurse = [];
    this.patients = [];

    this.instance = axios.create({
      baseURL: 'https://helped-alpaca-obliging.ngrok-free.app',
    });
  }

  public getDoctors() {
    return this.doctors;
  }

  public async loadDoctors() {
    const users = await networkService.getUsers();
    this.doctors = users.filter(
      (user) => user.role === ROLE.DOCTOR
    ) as Doctor[];
  }

  private async loadNurses() {
    const users = await networkService.getUsers();
    this.nurse = users.filter((user) => user.role === ROLE.NURSE) as Nurse[];
  }

  private async loadPatients() {
    const users = await networkService.getUsers();
    this.patients = users.filter(
      (user) => user.role === ROLE.PATIENT
    ) as Patient[];
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

  public async addUser(
    email: string,
    user_name: string,
    password: string,
    role: ROLE
  ) {
    try {
      await this.instance.post(
        '/users',
        {
          email,
          user_name,
          password,
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${loginService.getAccessToken()}`,
          },
        }
      );

      await this.loadDoctors();

      return 'Success!';
    } catch (e: any) {
      const obj: UserResponseErrorMessage | undefined = e.response
        ? e.response.data
        : undefined;
      if (obj) {
        return obj.message.length > 0 ? obj.message[0] : 'Unknown error';
      }
      return 'Unknown error';
    }
  }

  public async updateUser(body: BodyUpdateUser) {
    try {
      const response = await this.instance.patch('/users', body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loginService.getAccessToken()}`,
        },
      });

      return 'Success!';
    } catch (e) {
      console.error('Error:', e);
      return 'Failed!';
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

    ipcMain.handle(
      USER_SERVICE.ADD_DOCTOR,
      async (
        event,
        args: {
          email: string;
          user_name: string;
          password: string;
        }
      ) => {
        return await this.addUser(
          args.email,
          args.user_name,
          args.password,
          ROLE.DOCTOR
        );
      }
    );

    ipcMain.handle(
      USER_SERVICE.ADD_NURSE,
      async (
        event,
        args: {
          email: string;
          user_name: string;
          password: string;
        }
      ) => {
        return await this.addUser(
          args.email,
          args.user_name,
          args.password,
          ROLE.NURSE
        );
      }
    );

    ipcMain.handle(USER_SERVICE.UPDATE_USER, async (event, args) => {
      return await this.updateUser(args.body);
    });
  }
}

export default new UserService();
