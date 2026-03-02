import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ProtocolDto {
  @ApiProperty({ example: 'rest', description: 'Protocol type', default: 'grpc' })
  @IsOptional()
  protocol: 'rest' | 'grpc';
}