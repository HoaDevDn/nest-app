import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from '~modules/user/dto/login.dto';
import { RegisterDto } from '~modules/user/dto/register.dto';
import { UserService } from '~modules/user/user.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register an account' }) // Describes the purpose of this endpoint
  @ApiResponse({ status: 201, description: 'Register' })
  async register(@Body() registerDto: RegisterDto) {
    return this.userService.createUser(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login feature' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout() {
    // handle token invalidation or client-side token removal
    return { message: 'Logout successful' };
  }
}
