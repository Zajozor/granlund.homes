const Sequelize = require('sequelize');
const config = require('db/config/config');

const terminateConnections = async () => {
  const { username, password, database } = config; // Adjust to match your environment structure

  let sequelize;
  try {
    sequelize = new Sequelize(config.database, username, password, config);
  } catch {
    console.log('Unable to connect to database');
    return;
  }

  try {
    const result = await sequelize.query(`
        SELECT
            pid,
            usename,
            application_name,
            client_addr,
            state
        FROM
            pg_stat_activity
        WHERE
            datname = 'db';
    `);

    const connections = result[0];

    if (connections.length) {
      console.log(JSON.stringify(connections, null, 2));

      await sequelize.query(`
        SELECT pg_terminate_backend(pid)
        FROM pg_stat_activity
        WHERE datname = '${database}' AND pid <> pg_backend_pid();
      `);

      console.log(`Active connections to the database '${database}' have been terminated.`);
    } else {
      console.log(`No active connections found for the database '${database}'.`);
    }
  } catch (error) {
    console.error(error);
  } finally {
    await sequelize.close();
  }
};

terminateConnections();
