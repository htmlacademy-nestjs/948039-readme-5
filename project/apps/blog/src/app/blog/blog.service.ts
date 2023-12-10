import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { BlogRepository } from './blog.repository';
import { BlogContent, CreateBlogDto } from './dto/create-blog.dto';
import { Blog, BlogStatus, BlogType, VideoBlogContent } from '@project/libs/app/types';
import { VideoBlogRepository } from './blog-content/video-blog-content/video-blog.repository';
import { VideoBlogEntity } from './blog-content/video-blog-content/video-blog.entity';
import { isVideoBlogConent } from './utils';
import { NOT_CREATE_BLOG_CONTENT, NOT_FOUND_BLOG, NOT_FOUND_BLOG_CONTENT } from './constants';
import { BlogEntity } from './blog.entity';
import {fillDto} from '@project/libs/helpers';
import { BlogRdo } from './rdo/blog.rdo';
import { UpdateBlogDto } from './dto/update-blog.tdo';

@Injectable()
export class BlogService {
  constructor(
    private readonly blogRepository: BlogRepository,
    private readonly videoBlogRepository: VideoBlogRepository,
  ) {}

  public async create(dto: CreateBlogDto) {
    let contentId: string | null = null;
    if (isVideoBlogConent(dto.type, dto.content)) {
      const videoBlogEntity = new VideoBlogEntity(dto.content)
      contentId = (await this.videoBlogRepository.save(videoBlogEntity)).id;
    }

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
    return this.blogRepository.save(blogEntity)
  }

  public async findById(id: string) {
    const existBlog = await this.blogRepository.findById(id);

    if (!existBlog) {
      throw new NotFoundException(NOT_FOUND_BLOG);
    }

    let content: BlogContent | null = null;
    if (existBlog.type === BlogType.Video) {
      content = await this.videoBlogRepository.findById(existBlog.contentId);
    }

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


    if (existBlog.type === BlogType.Video) {
      const videoBlogEntity = new VideoBlogEntity(dto.content as VideoBlogContent);
      content = await this.videoBlogRepository.update(existBlog.contentId, videoBlogEntity);
    }

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

    if (existBlog.type === BlogType.Video) {
      await this.videoBlogRepository.deleteById(existBlog.contentId);
    }

    await this.blogRepository.deleteById(id);
  }
}
