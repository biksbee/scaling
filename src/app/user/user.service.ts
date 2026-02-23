import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

@Injectable()
export class UserService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async onApplicationBootstrap() {
    // Генерируем 100 пользователей при старте
    // await this.generateUsers(4900);
  }

  async generateUsers(n: number): Promise<void> {
    const users: UserEntity[] = [];
    for (let i = 0; i < n; i++) {
      const user = this.userRepository.create({
        nick: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
      users.push(user);
    }
    await this.userRepository.save(users);
  }

  async get(id: number): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id });
  }
}