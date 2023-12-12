import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { BlogRepository } from './blog.repository';
import { BlogContent, CreateBlogDto } from './dto/create-blog.dto';
import { Blog, BlogStatus } from '@project/libs/app/types';
import { NOT_CREATE_BLOG_CONTENT, NOT_FOUND_BLOG, NOT_FOUND_BLOG_CONTENT } from './constants';
import { BlogEntity } from './blog.entity';
import {fillDto} from '@project/libs/helpers';
import { BlogRdo } from './rdo/blog.rdo';
import { UpdateBlogDto } from './dto/update-blog.tdo';
import { BaseBlogContentService } from './base-blog/base-blog.service';
import { baseBlogEntityFactory } from './base-blog/base-blog.factory';

@Injectable()
export class BlogService {
  constructor(
    private readonly blogRepository: BlogRepository,
    private readonly baseBlogContentService: BaseBlogContentService
  ) { }

  public async create(dto: CreateBlogDto) {
    let contentId: string | null = null;
    const baseBlogContentEntity = baseBlogEntityFactory(dto.type, dto.content);
    contentId = (await this.baseBlogContentService.save(dto.type, baseBlogContentEntity)).id;
    if (contentId === null) {
      throw new ConflictException(NOT_CREATE_BLOG_CONTENT);
    }
    const blog: Blog = {
      type: dto.type,
      contentId,
      createdDate: new Date(),
      postedDate: new Date(),
      status: BlogStatus.Draft,
      author: dto.author,
      tags: dto.tags,
      repost: false
    }
    const blogEntity = new BlogEntity(blog);
    return this.blogRepository.save(blogEntity);
  }

  public async findById(id: string) {
    const existBlog = await this.blogRepository.findById(id);
    if (!existBlog) {
      throw new NotFoundException(NOT_FOUND_BLOG);
    }
    let content: BlogContent | null = null;
    content = (await this.baseBlogContentService.findById(existBlog.type, existBlog.contentId));
    if (content === null) {
      throw new NotFoundException(NOT_FOUND_BLOG_CONTENT);
    }
    return fillDto(BlogRdo, {...existBlog , content: {...content, type: existBlog.type}}, {
      enableImplicitConversion: true
    })
  }

  public async updateById(id: string, dto: UpdateBlogDto) {
    const existBlog = await this.blogRepository.findById(id);
    if (!existBlog) {
      throw new NotFoundException(NOT_FOUND_BLOG);
    }
    let content: BlogContent | null = null;
    const baseBlogContentEntity = baseBlogEntityFactory(existBlog.type, dto.content);
    content = (await this.baseBlogContentService.update(existBlog.type, existBlog.contentId, baseBlogContentEntity));
    if (content === null) {
      throw new NotFoundException(NOT_FOUND_BLOG_CONTENT);
    }
    const {content: _, ...updatetBlogInfo} = dto;
    const blogEntity = new BlogEntity({...existBlog.toPlainObject(), ...updatetBlogInfo});
    const newBlog = await this.blogRepository.update(id, blogEntity);
    return fillDto(BlogRdo, {...newBlog , content: {...content, type: newBlog.type}}, {
      enableImplicitConversion: true
    })
  }

  public async deleteById(id: string) {
    const existBlog = await this.blogRepository.findById(id);
    if (!existBlog) {
      throw new NotFoundException(NOT_FOUND_BLOG);
    }
    await this.baseBlogContentService.deleteById(existBlog.type, existBlog.contentId);
    await this.blogRepository.deleteById(id);
  }
}
