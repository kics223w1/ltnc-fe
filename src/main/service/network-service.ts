import axios from 'axios';
import Doctor from '../models/doctor';
import Examination from '../models/examination';
import Patient from '../models/patient';
import Medicine from '../models/medicine';
import User from '../models/user';
import loginService from './login-service';
import Machine from '../models/machine';

class NetworkService {
  private instance: any;

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://helped-alpaca-obliging.ngrok-free.app',
    });
  }

  public async getExaminations(userID: string): Promise<Examination[]> {
    try {
      const response = await this.instance.get(`/examinations/${userID}`);
      return response.data ? response.data : [];
    } catch (e) {
      return [];
    }
  }

  public async getDoctors(): Promise<Doctor[]> {
    try {
      const response = await this.instance.get('/users/doctor');
      return response.data ? response.data : [];
    } catch (e) {
      return [];
    }
  }

  public async getPatients(): Promise<Patient[]> {
    try {
      const response = await this.instance.get('/users/patient');
      return response.data ? response.data : [];
    } catch (e) {
      return [];
    }
  }

  public async getNurses(): Promise<Doctor[]> {
    try {
      const response = await this.instance.get('/users/nurse');
      return response.data ? response.data : [];
    } catch (e) {
      return [];
    }
  }

  public async getUsers(): Promise<User[]> {
    try {
      const accessToken = loginService.getAccessToken();
      const config = accessToken
        ? { headers: { Authorization: `Bearer ${accessToken}` } }
        : {};

      const response = await this.instance.get('/users', config);
      return response.data ? response.data : [];
    } catch (e) {
      return [];
    }
  }

  public async getMedicines(): Promise<Medicine[]> {
    try {
      const accessToken = loginService.getAccessToken();
      const config = accessToken
        ? { headers: { Authorization: `Bearer ${accessToken}` } }
        : {};

      const response = await this.instance.get('/medicine', config);
      return response.data ? response.data : [];
    } catch (e) {
      return [];
    }
  }

  public async getMachines(): Promise<Machine[]> {
    try {
      const obj = await this.instance.get('/machines');
      return obj.data;
    } catch (e) {
      return [];
    }
  }
}

export default new NetworkService();
