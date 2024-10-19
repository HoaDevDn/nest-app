import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '~modules/user/entities/user.entity';
import { UserService } from '~modules/user/user.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(_email: string, _password: string): Promise<UserEntity> {
    // const user = await this.userService.findByEmail(email);
    // if (user && (await user.validatePassword(password))) {
    //   return user;
    // }
    throw new UnauthorizedException('Invalid credentials');
  }

  login(user: UserEntity) {
    return {
      accessToken: this.jwtService.sign({ email: user.email, id: user.id }),
    };
  }
}
