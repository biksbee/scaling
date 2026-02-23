import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PostController } from './controllers/post.controller';

@Module({
  controllers: [PostController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: 'POST_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'post.v1',
          protoPath: join(__dirname, '../proto/post.proto'),
        }
      },
    ]),
  ],
  exports: [],
})
export class GatewayModule {}