import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'modules/users/entities/user.entity';
import { UserService } from 'modules/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (user && (await user.validatePassword(password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  login(user: User) {
    return {
      accessToken: this.jwtService.sign({ email: user.email, id: user.id }),
    };
  }
}
