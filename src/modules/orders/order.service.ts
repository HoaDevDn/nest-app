import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}
  async paginate(dto: PaginationDto) {
    const { page, limit } = dto;
    const [users, total] = await this.orderRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: {
        customer: true,
      },
    });
    return {
      page,
      limit,
      total,
      data: users,
      lastPage: Math.ceil(total / limit),
    };
  }
}
