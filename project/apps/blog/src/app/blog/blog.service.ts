import { Injectable } from '@nestjs/common';
import { BlogRepository } from './blog.repository';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogEntity } from './blog.entity';
import { UpdateBlogDto } from './dto/update-blog.tdo';

@Injectable()
export class BlogService {
  constructor(
    private readonly blogRepository: BlogRepository,
  ) { }

  public async create(dto: CreateBlogDto) {
    const blogEntity = new BlogEntity(dto);
    return await this.blogRepository.save(blogEntity);
  }

  public async findById(id: string) {
    // const existBlog = await this.blogRepository.findById(id);
    // if (!existBlog) {
    //   throw new NotFoundException(NOT_FOUND_BLOG);
    // }
    // let content: BlogContent | null = null;
    // content = (await this.baseBlogContentService.findById(existBlog.type, existBlog.contentId));
    // if (content === null) {
    //   throw new NotFoundException(NOT_FOUND_BLOG_CONTENT);
    // }
    // return fillDto(BlogRdo, {...existBlog , content: {...content, type: existBlog.type}}, {
    //   enableImplicitConversion: true
    // })
  }

  public async updateById(id: string, dto: UpdateBlogDto) {
    // const existBlog = await this.blogRepository.findById(id);
    // if (!existBlog) {
    //   throw new NotFoundException(NOT_FOUND_BLOG);
    // }
    // let content: BlogContent | null = null;
    // const baseBlogContentEntity = baseBlogEntityFactory(existBlog.type, dto.content);
    // content = (await this.baseBlogContentService.update(existBlog.type, existBlog.contentId, baseBlogContentEntity));
    // if (content === null) {
    //   throw new NotFoundException(NOT_FOUND_BLOG_CONTENT);
    // }
    // const {content: _, ...updatetBlogInfo} = dto;
    // const blogEntity = new BlogEntity({...existBlog.toPlainObject(), ...updatetBlogInfo});
    // const newBlog = await this.blogRepository.update(id, blogEntity);
    // return fillDto(BlogRdo, {...newBlog , content: {...content, type: newBlog.type}}, {
    //   enableImplicitConversion: true
    // })
  }

  public async deleteById(id: string) {
    // const existBlog = await this.blogRepository.findById(id);
    // if (!existBlog) {
    //   throw new NotFoundException(NOT_FOUND_BLOG);
    // }
    // await this.baseBlogContentService.deleteById(existBlog.type, existBlog.contentId);
    // await this.blogRepository.deleteById(id);
  }
}
