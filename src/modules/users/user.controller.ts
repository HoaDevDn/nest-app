import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasePaginationDto } from 'core/dto/pagination.dto';
import { UserService } from 'modules/users/user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {
    //
  }

  @Get()
  @ApiOperation({ summary: 'Paginate Users' })
  paginate(@Query() paginateDto: BasePaginationDto) {
    return this.userService.paginate(paginateDto);
  }
}
