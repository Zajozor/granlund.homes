// src/database.ts
import { Sequelize } from 'sequelize-typescript';
import dbConfig from './config/config';

const sequelize = new Sequelize(
  dbConfig,
);

export default sequelize;
