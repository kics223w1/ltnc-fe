import notificationService from './service/notification-service';

export const listenEventsFromRendererProcess = () => {
  notificationService.listenEventsFromRendererProcess();
};
