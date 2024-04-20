import axios from 'axios';
import { HttpProxyAgent } from 'http-proxy-agent';
import { HttpsProxyAgent } from 'https-proxy-agent';
import Doctor from '../models/doctor';
import Examination from '../models/examination';

class NetworkService {
  private instance: any;

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://helped-alpaca-obliging.ngrok-free.app',
      proxy: {
        host: '192.168.0.101',
        port: 9090,
      },
      httpAgent: new HttpProxyAgent(`http://192.168.0.101:9090}`),
      httpsAgent: new HttpsProxyAgent(`https://192.168.0.101:9090`),
    });
  }

  public async getExaminations(userID: string): Promise<Examination[]> {
    try {
      const response = await this.instance.get(`/examinations/${userID}`);
      const obj: { examinations: Examination[] } = response.data;
      return obj.examinations;
    } catch (e) {
      return [];
    }
  }

  public async getDoctors(): Promise<Doctor[]> {
    try {
      const response = await this.instance.get('/doctors');
      const obj: { doctors: Doctor[] } = response.data;
      return obj.doctors;
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
