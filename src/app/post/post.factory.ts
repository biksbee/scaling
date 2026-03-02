import { Injectable } from '@nestjs/common';
import { RestPostService } from './providers/rest-post.service';
import { GrpcPostService } from './providers/grpc-post.service';
import { ProtocolType } from '../../utils/type';

@Injectable()
export class PostFactory {
  constructor(
    private readonly restPostService: RestPostService,
    private readonly grpcPostService: GrpcPostService,
  ) {}

  getTransport(protocol: ProtocolType) {
    return protocol === 'rest'
      ? this.restPostService
      : this.grpcPostService;
  }
}