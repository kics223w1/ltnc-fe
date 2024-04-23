import loginService from './service/login-service';
import managementService from './service/management-service';
import notificationService from './service/notification-service';
import patientService from './service/patient-service';
import userService from './service/user-service';

export const listenEventsFromRendererProcess = () => {
  userService.listenEventsFromRendererProcess();
  notificationService.listenEventsFromRendererProcess();
  managementService.listenEventsFromRendererProcess();
  patientService.listenEventsFromRendererProcess();
  loginService.listenEventsFromRendererProcess();
};
