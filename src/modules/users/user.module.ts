import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AuthService } from 'modules/auth/auth.service';
import { JwtStrategy } from 'modules/auth/jwt-strategy';
import { AuthController } from 'modules/auth/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Import the User entity
    JwtModule.register({
      secret: 'your-secret-key', // Set your secret key for JWT
      signOptions: { expiresIn: '60m' }, // Token expiration time
    }),
  ],
  providers: [UserService, AuthService, JwtStrategy], // Register services and strategy
  controllers: [AuthController], // Register the auth controller
  exports: [UserService], // Export UserService so other modules can use it
})
export class UserModule {}
