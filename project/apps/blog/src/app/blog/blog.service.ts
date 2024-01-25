import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BlogRepository } from './blog.repository';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogEntity } from './blog.entity';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { NOT_FOUND_BLOG } from './constants';
import { BlogQuery } from './query/blog-query';
import { fillDto } from '@project/libs/helpers';
import { BlogRdo } from './rdo/blog.rdo';
import { BlogPostWithPaginationRdo } from './rdo/blogs.rdo';

@Injectable()
export class BlogService {
  constructor(
    private readonly blogRepository: BlogRepository,
  ) { }

  public async create(dto: CreateBlogDto) {
    const blogEntity = new BlogEntity(dto);
    const blog = await this.blogRepository.save(blogEntity);
    return fillDto(BlogRdo, blog);
  }

  public async find(param: BlogQuery) {
    const blogs = await this.blogRepository.find(param);
    return fillDto(BlogPostWithPaginationRdo, blogs);
  }

  public async findById(id: string) {
    const existBlog = await this.blogRepository.findById(id);
    if (!existBlog) {
      throw new NotFoundException(NOT_FOUND_BLOG);
    }
    const blog = await this.blogRepository.findById(id);
    return fillDto(BlogRdo, blog);
  }

  public async updateById(id: string, dto: UpdateBlogDto) {
    const existBlog = await this.blogRepository.findById(id);
    if (!existBlog) {
      throw new NotFoundException(NOT_FOUND_BLOG);
    }
    const newBlogEntity = new BlogEntity({...existBlog, ...dto});
    const blog = await this.blogRepository.updateById(id, existBlog, newBlogEntity);
    return fillDto(BlogRdo, blog);
  }

  public async deleteById(id: string) {
    const existBlog = await this.blogRepository.findById(id);
    if (!existBlog) {
      throw new NotFoundException(NOT_FOUND_BLOG);
    }
    return await this.blogRepository.deleteById(id);
  }

  public async repostById(id: string, userId: string) {
    const existBlog = await this.blogRepository.findById(id);
    if (!existBlog) {
      throw new NotFoundException(NOT_FOUND_BLOG);
    }
    if (existBlog.userId === userId) {
      throw new BadRequestException();
    }

    const blog = await this.blogRepository.repostById(userId, existBlog);
    return fillDto(BlogRdo, blog);
  }

  public async findUserInfo(userId: string) {
    const blogCount = await this.blogRepository.findUserInfo(userId);

    return blogCount ?? 0;
  }
}
