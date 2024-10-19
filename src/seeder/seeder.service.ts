import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '~modules/user/entities/user.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async seed() {
    await this.createUsers();
  }

  private async createUsers() {
    // const users: UserEntity[] = [
    //   {
    //     username: 'john',
    //     password: 'password1',
    //   },
    // ];
    // for (const userData of users) {
    //   const user = this.userRepository.create({
    //     username: 'john',
    //     password: 'password1',
    //   });
    //   await this.userRepository.save(user);
    // }
    // console.log('Users seeded successfully');
  }
}
