const Sequelize = require('sequelize');
const config = require('db/config/config');

const terminateConnections = async () => {
  const username = config.username;
  const password = config.password;
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
        WHERE datname = 'db' AND pid <> pg_backend_pid();
      `);

      console.log(`Active connections to db terminated.`);
    }
  } catch {
    console.log('Error terminating connections');
  } finally {
    await sequelize.close();
  }
};

terminateConnections();