import notificationService from './service/notification-service';
import sqlServerConnectorService from './service/sql-server-connector-service';

export const listenEventsFromRendererProcess = () => {
  notificationService.listenEventsFromRendererProcess();
};
