import { faker } from '@faker-js/faker/locale/vi';
import { random, range } from 'lodash';
import { DataSource } from 'typeorm';
import { AppDataSource } from '~configs/orm.config';
import { Car } from '~modules/cars/car.entity';
import { CarStatusEnum } from '~modules/cars/car.enum';
import { Order } from '~modules/orders/order.entity';
import { Role } from '~modules/users/entities/role.entity';
import { UserResetPassword } from '~modules/users/entities/user-reset-password.entity';
import { User } from '~modules/users/entities/user.entity';
import { UserStatusEnum } from '~modules/users/user.enum';

const listCars = [
  'Toyota Camry',
  'Honda Civic',
  'Ford Mustang',
  'Chevrolet Corvette',
  'Tesla Model S',
  'BMW 3 Series',
  'Audi A4',
  'Mercedes-Benz C-Class',
  'Porsche 911',
  'Lexus RX',
  'Nissan Altima',
  'Hyundai Sonata',
  'Kia Sorento',
  'Volkswagen Passat',
  'Jeep Wrangler',
  'Subaru Outback',
  'Mazda CX-5',
  'Land Rover Range Rover',
  'Volvo XC90',
  'Ferrari 488',
  'Lamborghini Huracán',
  'Maserati Ghibli',
  'Rolls-Royce Phantom',
  'Bentley Continental GT',
  'Bugatti Chiron',
  'Aston Martin DB11',
  'McLaren 720S',
  'Dodge Challenger',
  'Cadillac Escalade',
  'Alfa Romeo Giulia',
];

const clearAllDataInTable = async (connection: DataSource) => {
  await connection.createQueryBuilder().delete().from(Order).execute();
  await connection.createQueryBuilder().delete().from(Car).execute();
  await connection
    .createQueryBuilder()
    .delete()
    .from(UserResetPassword)
    .execute();
  await connection.createQueryBuilder().delete().from(User).execute();
  await connection.createQueryBuilder().delete().from(Role).execute();
};

export async function seed() {
  const connection = await AppDataSource.initialize();
  const roleRepository = AppDataSource.getRepository(Role);
  const userRepository = AppDataSource.getRepository(User);
  const carRepository = AppDataSource.getRepository(Car);
  const orderRepository = AppDataSource.getRepository(Order);

  await clearAllDataInTable(connection);

  // Roles
  const adminRole = roleRepository.create({
    id: faker.string.uuid(),
    name: 'admin',
  });
  const userRole = roleRepository.create({
    id: faker.string.uuid(),
    name: 'user',
  });
  const roles = [adminRole, userRole];
  await roleRepository.save(roles);

  // Users
  const AMOUNT_OF_ADMIN = 5;
  const users: User[] = [];
  for (const index of range(20)) {
    const user = userRepository.create({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'Admin123@',
      role: index < AMOUNT_OF_ADMIN ? adminRole : userRole,
      status:
        index < 2
          ? UserStatusEnum.Active
          : random(UserStatusEnum.Active, UserStatusEnum.Active),
    });
    users.push(user);
  }
  await userRepository.save(users);

  // Cars
  const cars: Car[] = [];
  for (const name of listCars) {
    const status = [
      CarStatusEnum.OutOfStock,
      CarStatusEnum.Available,
      CarStatusEnum.Sold,
    ][random(0, roles.length - 1)];
    const car = carRepository.create({
      id: faker.string.uuid(),
      name: name,
      status: status,
      price: faker.number.float({ min: 1000, max: 99999 }),
      image: faker.image.urlLoremFlickr(),
    });
    cars.push(car);
  }
  await carRepository.save(cars);

  // Orders
  const orders: Order[] = [];
  for (const _index of range(50)) {
    const order = orderRepository.create({
      id: faker.string.uuid(),
      totalPrice: faker.number.float({ min: 1500, max: 99999 }),
      car: cars[random(0, listCars.length - 1)],
      customer: users[random(AMOUNT_OF_ADMIN, users.length - 1)],
    });
    orders.push(order);
  }
  await orderRepository.save(orders);

  // eslint-disable-next-line no-console
  console.log('Seeded successfully');
  process.exit(0);
}

seed();
