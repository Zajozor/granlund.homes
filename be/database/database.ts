// src/database.ts
import { Sequelize } from 'sequelize-typescript';
import dbConfig from './config/config';

const sequelize = new Sequelize({
  ...dbConfig,
  models: [__dirname + '/models'], // Adjust the path as necessary
});

export default sequelize;
