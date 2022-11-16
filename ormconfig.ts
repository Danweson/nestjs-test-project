// eslint-disable-next-line @typescript-eslint/no-var-requires
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
// import process from 'process';
dotenv.config();

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/resources/**/*.entity.js'],
  migrations: ['dist/**/database/migrations/*.js'],
  // cli: {
  //   migrationsDir: 'src/database/migrations',
  // },
  // seeds: ['dist/**/database/seeds/**/*.js'],
  // factories: ['dist/**/database/factories/**/*.js'],
  synchronize: false,
  logging: true,
});
