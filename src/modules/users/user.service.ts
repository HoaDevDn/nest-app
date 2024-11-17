import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasePaginationDto } from 'core/dto/pagination.dto';
import { Order } from 'modules/orders/order.entity';
import { RegisterDto } from './dto/register.dto';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async createUser({ email, password, name }: RegisterDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const role = await this.roleRepository.findOne({ where: { name: 'user' } });
    const user = this.userRepository.create({
      name,
      email,
      password,
      role,
      status: 1,
    });
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async paginate({ page, limit }: BasePaginationDto) {
    const [users, total] = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.name', 'user.email'])
      .loadRelationCountAndMap('user.amountOfOrders', 'user.orders') // amountOfOrders is field name returned
      .take(limit)
      .skip((page - 1) * limit)
      .getManyAndCount();

    return {
      page,
      limit,
      total,
      data: users,
      totalPages: Math.ceil(total / limit),
    };
    /*
    // Another way
    const [users, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      select: ['id', 'name', 'email'],
      relations: {
        orders: true,
      },
    });
    for (const user of users) {
      user['amountOfOrders'] = await this.orderRepository.count({
        where: { customer: { id: user.id } },
      });
    }
    return {
      page,
      total,
      data: users,
      lastPage: Math.ceil(total / limit),
    };
    */
  }
}
