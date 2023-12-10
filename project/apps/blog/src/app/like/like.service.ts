import { Injectable, NotFoundException } from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { BlogRepository } from '../blog/blog.repository';
import { NOT_FOUND_BLOG } from '../blog/constants';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly blogRepository: BlogRepository
  ) {}

  public async getCount(id: string) {
    const existBlog = await this.blogRepository.findById(id);

    if (!existBlog) {
      throw new NotFoundException(NOT_FOUND_BLOG);
    }

    return this.likeRepository.getAllById(id);
  }

  public async setLike(blogId: string, userId: string) {
    const existBlog = await this.blogRepository.findById(blogId);

    if (!existBlog) {
      throw new NotFoundException(NOT_FOUND_BLOG);
    }

    return this.likeRepository.setLike(blogId, userId);
  }
}
