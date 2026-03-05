import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreatePostDto, GetPostDto, ListPostDto } from './post.dto';
import { ProtocolDto } from '../../utils/dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  private readonly logger = new Logger(PostController.name);
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
    const start = Date.now();
    const post = await this.postService.create(dto, protocol);
    const duration = Date.now() - start;
    this.logger.log(`${protocol}, Create processed in ${duration}ms`);
    return post;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get post',
  })
  async findOne(
    @Param() { id }: GetPostDto,
    @Query() { protocol }: ProtocolDto,
  ) {
    const start = Date.now();
    const post = await this.postService.get(id, protocol);
    const duration = Date.now() - start;
    this.logger.log(`${protocol}, GetPost processed in ${duration}ms`);
    return post;
  }

  @Get('list/:userId')
  @ApiOperation({
    summary: 'Get list of posts',
  })
  async findAll(
    @Param() { userId }: ListPostDto,
    @Query() { protocol }: ProtocolDto,
  ) {
    const start = Date.now();
    const posts = await this.postService.list(userId, protocol);
    const duration = Date.now() - start;
    this.logger.log(`${protocol}, GetList processed in ${duration}ms`);
    return posts;
  }
}