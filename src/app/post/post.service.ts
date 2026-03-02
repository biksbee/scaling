import { Injectable, Logger } from '@nestjs/common';
import { PostFactory } from './post.factory';
import { ProtocolType } from '../../utils/type';
import { CreatePostType } from './post.type';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(
    private readonly factory: PostFactory
  ) {}

  async get(id: number, protocol: ProtocolType) {
    const transport = this.factory.getTransport(protocol);
    return transport.get(id);
  }

  async create(data: CreatePostType, protocol: ProtocolType) {
    const transport = this.factory.getTransport(protocol);
    return transport.create(data);
  }

  async list(userId: number, protocol: ProtocolType) {
    const transport = this.factory.getTransport(protocol);
    return transport.list(userId)
  }
}