import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogRepository } from './blog.repository';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogEntity } from './blog.entity';
import { UpdateBlogDto } from './dto/update-blog.tdo';
import { NOT_FOUND_BLOG } from './constants';

@Injectable()
export class BlogService {
  constructor(
    private readonly blogRepository: BlogRepository,
  ) { }

  public async create(dto: CreateBlogDto) {
    const blogEntity = new BlogEntity(dto);
    return await this.blogRepository.save(blogEntity);
  }

  public async find() {
    return await this.blogRepository.find();
  }

  public async findById(id: string) {
    const existBlog = await this.blogRepository.findById(id);
    if (!existBlog) {
      throw new NotFoundException(NOT_FOUND_BLOG);
    }
    return await this.blogRepository.findById(id);
  }

  public async updateById(id: string, dto: UpdateBlogDto) {
    const existBlog = await this.blogRepository.findById(id);
    if (!existBlog) {
      throw new NotFoundException(NOT_FOUND_BLOG);
    }
    const newBlogEntity = new BlogEntity({...existBlog, ...dto});
    return await this.blogRepository.updateById(id, existBlog, newBlogEntity);
  }

  public async deleteById(id: string) {
    const existBlog = await this.blogRepository.findById(id);
    if (!existBlog) {
      throw new NotFoundException(NOT_FOUND_BLOG);
    }
    await this.blogRepository.deleteById(id);
  }
}
