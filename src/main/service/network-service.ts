import axios from 'axios';
import { HttpProxyAgent } from 'http-proxy-agent';
import { HttpsProxyAgent } from 'https-proxy-agent';
import Doctor from '../models/doctor';
import Examination from '../models/examination';
import Patient from '../models/patient';
import Medicine from '../models/medicine';

const host = '192.168.0.100';
const port = 9090;

class NetworkService {
  private instance: any;

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://helped-alpaca-obliging.ngrok-free.app',
      proxy: {
        host: host,
        port: port,
      },
      httpAgent: new HttpProxyAgent(`http://${host}:${port}}`),
      httpsAgent: new HttpsProxyAgent(`https://${host}:${port}`),
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

  public async getMedicines(): Promise<Medicine[]> {
    try {
      const response = await this.instance.get('/medicine');
      return response.data ? response.data : [];
    } catch (e) {
      return [];
    }
  }

  public async getMachines() {
    try {
      const obj = await this.instance.get('/machines');
      return obj.data;
    } catch (e) {
      return [];
    }
  }
}

export default new NetworkService();
