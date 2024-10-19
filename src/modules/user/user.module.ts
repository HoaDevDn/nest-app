import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'configs/env.config';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { AuthController } from '~modules/authentication/authentication.controller';
import { AuthenticationService } from '~modules/authentication/authentication.service';
import { JwtStrategy } from '~modules/authentication/jwt-strategy';
import { RoleEntity } from '~modules/authorization/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]), // Import the User entity
    JwtModule.register({
      secret: env.JWT_SECRET, // Set your secret key for JWT
      signOptions: { expiresIn: '60m' }, // Token expiration time
    }),
  ],
  providers: [UserService, AuthenticationService, JwtStrategy], // Register services and strategy
  controllers: [AuthController], // Register the auth controller
  exports: [UserService], // Export UserService so other modules can use it
})
export class UserModule {}
