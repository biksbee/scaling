import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetUserDto {
  @ApiProperty({ example: 1, description: 'User id'})
  @Type(() => Number)
  @IsNumber()
  id: number;
}