import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { PostTransportInterface } from '../post.interface';
import { UserService } from '../../user/user.service';
import { CreatePostDto } from '../post.dto';
import axios from 'axios';

@Injectable()
export class RestPostService  implements PostTransportInterface {
  private readonly logger = new Logger(RestPostService.name);

  constructor(
    private readonly userService: UserService,
  ) {}

  async create(data: CreatePostDto) {}

  async get(id: number) {
    try {
      const { data } = await axios.get(`http://localhost:31000/posts/${id}`);
      return data;
    } catch(error) {
      throw new BadGatewayException('Failed to fetch data from scraper service', error);
    }
  }

  async list(userId: number) {
    try {
      const { data } = await axios.get(`http://localhost:31000/posts/list/${userId}`);
      return data;
    } catch (error) {
      throw new BadGatewayException('Failed to fetch data from scraper service', error);
    }
  }
}