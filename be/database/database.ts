import { Sequelize } from 'sequelize-typescript';
import dbConfig from './config/config';

const sequelize = new Sequelize({
  ...dbConfig,
  models: [__dirname + '/models'], // or [Player, Team],
});

export default sequelize;
