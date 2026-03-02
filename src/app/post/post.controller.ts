import { Body, Controller, Get, Inject, OnModuleInit, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto, GetPostDto, ListPostDto } from './post.dto';
import { ProtocolDto } from '../../utils/dto';
import { PostService } from './post.service';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create post',
  })
  async create(
    @Body() dto: CreatePostDto,
    @Query() { protocol }: ProtocolDto,
  ) {
    return this.postService.create(dto, protocol);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get post',
  })
  async findOne(
    @Param() { id }: GetPostDto,
    @Query() { protocol }: ProtocolDto,
  ) {
    return this.postService.get(id, protocol);
  }

  @Get('list/:userId')
  @ApiOperation({
    summary: 'Get list of posts',
  })
  async findAll(
    @Param() { userId }: ListPostDto,
    @Query() { protocol }: ProtocolDto,
  ) {
    return this.postService.list(userId, protocol);
  }
}