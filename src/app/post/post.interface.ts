import { CreatePostType } from './post.type';

export interface PostTransportInterface {
  get(id: number): Promise<any>;
  create(data: CreatePostType): Promise<any>;
  list(userId: number): Promise<any>;

}