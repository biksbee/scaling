import { UserService } from './user.service';
import { Controller, Get, Param } from '@nestjs/common';
import { GetUserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Get(':id')
  async get(
    @Param() { id }: GetUserDto,
  ) {
    return await this.userService.get(id);
  }
}

