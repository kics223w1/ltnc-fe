import SQLServerEntry from '../models/sql-server/sql-server-entry';
import ConnectorService from './connector-service';
const sql = require('mssql');

class SQLServerConnectorService extends ConnectorService<SQLServerEntry> {
  constructor() {
    super();
  }

  public async connectDatabase() {
    const config = {
      user: 'sa',
      password: 'Password.1',
      server: 'localhost',
      database: 'nike',
      options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instancename: 'SQLEXPRESS',
      },
      port: 1433,
    };

    // Connect to the database
    sql
      .connect(config)
      .then(async (pool: any) => {
        // Query
        const ans = await pool.request().query('SELECT * FROM shoes');
        console.log('huy ans: ', ans);
      })
      .then((result: any) => {
        console.dir(result);
      })
      .catch((err: any) => {
        console.error('Error: ', err);
      });
  }
}

export default new SQLServerConnectorService();
