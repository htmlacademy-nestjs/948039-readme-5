import { Body, Controller, Post, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.tdo';
import { BlogQuery } from './query/blog-query';

@Controller('blog')
export class BlogController {
  constructor(
    public readonly blogService: BlogService
  ) {}

  @Post('')
  public async create(@Body() dto: CreateBlogDto) {
    const blog = await this.blogService.create(dto);
    return blog;
  }

  @Get('')
  public async find(@Query() query: BlogQuery) {
    const blogs = await this.blogService.find(query);
    return blogs;
  }

  @Get(':id')
  public async findById(@Param('id') id: string) {
    const blog = await this.blogService.findById(id);
    return blog;
  }

  @Put(':id')
  public async updateById(
    @Body() dto: UpdateBlogDto,
    @Param('id') id: string
    ) {
    const blog = await this.blogService.updateById(id, dto);
    return blog;
  }

  @Delete(':id')
  public async deleteById(@Param('id') id: string) {
    const blog = await this.blogService.deleteById(id);
    return blog;
  }
}
