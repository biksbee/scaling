import { Module } from '@nestjs/common';
import { AdapterModule } from './adapters/adapter.module';

@Module({
  imports: [
    AdapterModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
