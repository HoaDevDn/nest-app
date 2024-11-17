import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasePaginationDto } from 'core/dto/pagination.dto';
import { JwtAuthGuard } from 'modules/auth/jwt-auth.guard';
import { UserService } from 'modules/users/user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {
    //
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Paginate Users' })
  paginate(@Query() paginateDto: BasePaginationDto) {
    return this.userService.paginate(paginateDto);
  }
}
