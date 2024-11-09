import { Sequelize } from 'sequelize-typescript';
import dbConfig from './config/config';

const sequelize = new Sequelize({
    ...dbConfig,
    models: [__dirname + '/models'],
  });

export default sequelize;