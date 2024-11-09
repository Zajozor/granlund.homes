// src/database.ts
import { Sequelize } from 'sequelize-typescript';
import dbConfig from './config/config';

console.log('dbConfig', dbConfig);

let sequelize: Sequelize;

try {
  sequelize = new Sequelize({
    ...dbConfig,
    models: [__dirname + '/models'],
  });

  console.log('sequelize', sequelize);
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// export default sequelize;