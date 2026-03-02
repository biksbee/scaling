import { PostTransportInterface } from '../post.interface';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { CreatePostType } from '../post.type';

@Injectable()
export class GrpcPostService implements PostTransportInterface, OnModuleInit {
  private readonly logger = new Logger(GrpcPostService.name);
  private postService: any;

  constructor(
    @Inject('POST_PACKAGE')
    private client: ClientGrpc
  ) {
  }

  onModuleInit() {
    this.postService = this.client.getService('PostService');
  }

  async create(data: CreatePostType) {
    return this.postService.CreatePost(data);
  }

  async get(id: number) {
    return this.postService.GetPost(id);
  }

  async list(userId: number) {
    return this.postService.ListPost(userId);
  }

}