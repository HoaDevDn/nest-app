import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { env } from './env.config';

const config: DataSourceOptions = {
  type: 'postgres',
  host: env.DB_HOST, // Hoặc giá trị host thực tế
  port: Number(env.DB_PORT),
  username: env.DB_USERNAME, // Thay bằng username PostgreSQL của bạn
  password: env.DB_PASSWORD, // Thay bằng password của bạn
  database: env.DB_NAME, // Thay bằng tên database bạn sử dụng
  entities: [`${env.ROOT_PATH}/src/**/*.entity.{ts,js}`],
  // migrations: [`${env.ROOT_PATH}/migrations/*{.ts,.js}`],
  synchronize: false,
};

export default registerAs('typeorm', () => ({
  ...config,
  autoLoadEntities: true,
}));

export const AppDataSource = new DataSource(config); // this one for migration, Don't remove.
