import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UserModule } from '../user/user.module';
import { PostFactory } from './post.factory';
import { GrpcPostService } from './providers/grpc-post.service';
import { RestPostService } from './providers/rest-post.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  providers: [
    PostService,
    PostFactory,
    GrpcPostService,
    RestPostService,
  ],
  controllers: [PostController],
  imports: [
    ClientsModule.register([
      {
        name: 'POST_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'post.v1',
          protoPath: join(__dirname, '../proto/post.proto'),
          url: '0.0.0.0:50051'
        }
      },
    ]),
    UserModule
  ],
  exports: [],
})
export class PostModule {}