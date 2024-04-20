import doctorService from './service/doctor-service';
import notificationService from './service/notification-service';

export const listenEventsFromRendererProcess = () => {
  notificationService.listenEventsFromRendererProcess();
  doctorService.listenEventsFromRendererProcess();
};
