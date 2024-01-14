import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { BlogRepository } from '../blog/blog.repository';
import { NOT_FOUND_BLOG } from '../blog/constants';
import { SetLikeDto } from './dto/set-like';
import { BlogStatus } from '@project/libs/app/types';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly blogRepository: BlogRepository
  ) {}
  public async setLike(dto: SetLikeDto) {
    const {blogId, userId} = dto;
    const existBlog = await this.blogRepository.findById(blogId);

    if (!existBlog) {
      throw new NotFoundException(NOT_FOUND_BLOG);
    }

    if (existBlog.status === BlogStatus.Draft) {
      throw new BadRequestException();
    }

    return this.likeRepository.setLike(blogId, userId);
  }
}
