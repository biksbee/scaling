import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Module({
  controllers: [],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
    ])
  ],
  exports: [UserService],
})
export class UserModule {}