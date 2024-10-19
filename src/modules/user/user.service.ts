import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from '~modules/authorization/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async createUser(_dto: RegisterDto): Promise<UserEntity> {
    // const { email, password, name } = _dto;
    // const existingUser = await this.userRepository.findOne({
    //   where: { email },
    // });
    // if (existingUser) {
    //   throw new ConflictException('User already exists');
    // }
    // const role = await this.roleRepository.findOne({ where: { name: 'user' } });
    // const user = this.userRepository.create({
    //   name,
    //   email,
    //   password,
    //   role,
    //   status: 1,
    // });
    // return this.userRepository.save(user);
    return null;
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }
}
