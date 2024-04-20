import doctorService from './service/doctor-service';
import managementService from './service/management-service';
import notificationService from './service/notification-service';

export const listenEventsFromRendererProcess = () => {
  notificationService.listenEventsFromRendererProcess();
  doctorService.listenEventsFromRendererProcess();
  managementService.listenEventsFromRendererProcess();
};
