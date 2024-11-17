import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './car.entity';
import { BasePaginationDto } from '~core/dto/pagination.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}

  async paginate({ page, limit }: BasePaginationDto) {
    const [cars, total] = await this.carRepository
      .createQueryBuilder('cars')
      .skip(page * limit)
      .take(5)
      .getManyAndCount();

    return {
      page,
      total,
      limit,
      data: cars,
      totalPages: Math.ceil(total / limit),
    };
  }
}
