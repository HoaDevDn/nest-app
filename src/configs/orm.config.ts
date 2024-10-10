import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { env } from './env.config';

const config = {
  type: 'postgres',
  host: env.DB_HOST, // Hoặc giá trị host thực tế
  port: Number(env.DB_PORT),
  username: env.DB_USERNAME, // Thay bằng username PostgreSQL của bạn
  password: env.DB_PASSWORD, // Thay bằng password của bạn
  database: env.DB_NAME, // Thay bằng tên database bạn sử dụng
  entities: env.ENTITIES,
  migrations: env.MIGRATIONS,
  autoLoadEntities: true,
  synchronize: false,
} as DataSourceOptions;

export default registerAs('typeorm', () => config);
export const AppDataSource = new DataSource(config); // this one for migration, Don't remove.
