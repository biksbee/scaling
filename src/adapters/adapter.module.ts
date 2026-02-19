import { Module } from '@nestjs/common';
import { AdapterGateway } from './adapter.gateway';

@Module({
  controllers: [],
  providers: [AdapterGateway],
  imports: [],
  exports: [],
})
export class AdapterModule {}