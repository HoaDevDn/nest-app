import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasePaginationDto } from 'core/dto/pagination.dto';
import { CarService } from './car.service';

@ApiTags('Cars')
@Controller('cars')
export class CarController {
  constructor(private carService: CarService) {
    //
  }

  @Get()
  @ApiOperation({ summary: 'Paginate cars' })
  paginate(@Query() dto: BasePaginationDto) {
    return this.carService.paginate(dto);
  }
}
