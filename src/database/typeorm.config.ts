import { config } from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: 'all',
  entities: [
    join(__dirname, '..', '..', './dist/**/*.entity.js'),
    join(__dirname, '..', '..', './dist/**/*.sql-view.js'),
  ],
  migrations: [join(__dirname, '..', '..', './dist/database/migrations/*.js')],
});
