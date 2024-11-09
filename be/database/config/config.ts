import { config as dotenvConfig } from 'dotenv-defaults';
dotenvConfig();

interface IDatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: 'postgres';
  pool: {
    min: number;
    max: number;
    idle: number;
    acquire: number;
    evict: number;
  };
  logging?: boolean | ((sql: string) => void);
  dialectOptions?: {
    ssl: {
      require: boolean;
      rejectUnauthorized: boolean;
    };
  };
}

const dbName = process.env.DB_NAME ?? 'junctioner';
const username = process.env.POSTGRES_USER ?? 'postgres';
const password = process.env.POSTGRES_PASSWORD ?? 'postgres';
const host = process.env.DB_HOST ?? 'localhost';
const port = Number(process.env.DB_PORT ?? '5432');

// const sslRequired = process.env.DB_SSL_REQUIRED?.toLowerCase() === 'true' || false;
const loggingEnabled = process.env.DB_LOGGING_ENABLED?.toLowerCase() === 'true' || false;

const commonConfig: Omit<IDatabaseConfig, 'database'> = {
  username,
  password,
  host,
  port,
  dialect: 'postgres',
  pool: {
    min: 0,
    max: 5,
    idle: 1000,
    acquire: 10000,
    evict: 100,
  },
  logging: loggingEnabled ? console.log : false,
};

//if (sslRequired) {
//  const rejectUnauthorized = process.env.DB_REJECT_UNAUTHORIZED?.toLowerCase() === 'true' || false;
//  dbConfig.dialectOptions = {
//    ssl: {
//      require: sslRequired,
//      rejectUnauthorized: rejectUnauthorized,
//    },
//  };
//}

export default commonConfig;
