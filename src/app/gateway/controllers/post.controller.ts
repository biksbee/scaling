import { Body, Controller, Get, Inject, OnModuleInit, Param, Post } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { ApiOperation } from '@nestjs/swagger';
import { CreatePostDto, GetPostDto } from './post.dto';

@Controller('posts')
export class PostController implements OnModuleInit {
  private postService: any;

  constructor(@Inject('POST_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.postService = this.client.getService('PostService');
  }

  @Post()
  @ApiOperation({
    summary: 'Create post',
  })
  async create(@Body() dto: CreatePostDto) {
    return this.postService.CreatePost(dto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get post',
  })
  async findOne(
    @Param() { id }: GetPostDto
  ) {
    return this.postService.FindOne({ id });
  }

  @Get()
  @ApiOperation({
    summary: 'Get list of posts',
  })
  async findAll() {
    return this.postService.FindAll({});
  }
}