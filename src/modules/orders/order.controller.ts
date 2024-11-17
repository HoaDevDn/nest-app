import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'modules/auth/jwt-auth.guard';
import { PaginationDto } from './dto/pagination.dto';
import { OrderService } from './order.service';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {
    //
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Paginate Orders' })
  paginate(@Query() dto: PaginationDto) {
    return this.orderService.paginate(dto);
  }
}
