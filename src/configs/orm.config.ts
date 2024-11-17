import { registerAs } from '@nestjs/config';
import { CreateRoleTable1726916715779 } from 'migrations/1726916715779-CreateRoleTable';
import { CreateUserTable1726975405484 } from 'migrations/1726975405484-CreateUserTable';
import { CreateUserResetPasswordTable1727517927086 } from 'migrations/1727517927086-CreateUserResetPasswordTable';
import { CreateCarTable1729394157614 } from 'migrations/1729394157614-CreateCarTable';
import { CreateOrderTable1729395014155 } from 'migrations/1729395014155-CreateOrderTable';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Car } from 'modules/cars/car.entity';
import { Order } from 'modules/orders/order.entity';
import { Role } from 'modules/users/entities/role.entity';
import { UserResetPassword } from 'modules/users/entities/user-reset-password.entity';
import { User } from 'modules/users/entities/user.entity';
import { env } from './env.config';

const config: DataSourceOptions = {
  type: 'postgres',
  host: env.DB_HOST, // Hoặc giá trị host thực tế
  port: Number(env.DB_PORT),
  username: env.DB_USERNAME, // Thay bằng username PostgreSQL của bạn
  password: env.DB_PASSWORD, // Thay bằng password của bạn
  database: env.DB_NAME, // Thay bằng tên database bạn sử dụng
  entities: [Role, User, UserResetPassword, Car, Order],
  migrations: [
    CreateCarTable1729394157614,
    CreateUserTable1726975405484,
    CreateRoleTable1726916715779,
    CreateOrderTable1729395014155,
    CreateUserResetPasswordTable1727517927086,
  ],
  // entities: [`${env.ROOT_PATH}/**/*.entity.{ts,js}`],
  // migrations: [`${env.ROOT_PATH}/migrations/*{.ts,.js}`],
  synchronize: false,
  logging: true,
};

export default registerAs('typeorm', () => ({
  ...config,
  autoLoadEntities: true,
}));

export const AppDataSource = new DataSource(config); // this one for migration, Don't remove.
