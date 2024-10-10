// // export default registerAs('typeorm', () => config);

import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  host: process.env.DB_HOST, // Hoặc giá trị host thực tế
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME, // Thay bằng username PostgreSQL của bạn
  password: process.env.DB_PASSWORD, // Thay bằng password của bạn
  database: process.env.DB_NAME, // Thay bằng tên database bạn sử dụng
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
} as DataSourceOptions;

export default registerAs('typeorm', () => config);
export const AppDataSource = new DataSource(config); // this one for migration, Don't remove.
