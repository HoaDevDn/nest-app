import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from './dto/pagination.dto';
import { OrderService } from './order.service';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {
    //
  }

  @Get()
  @ApiOperation({ summary: 'Paginate Orders' })
  paginate(@Query() dto: PaginationDto) {
    return this.orderService.paginate(dto);
  }
}
