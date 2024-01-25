import { Body, Controller, Post, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogQuery } from './query/blog-query';
import { RepostBlogDto } from './dto/repost-blog.dto';

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

  @Get('user/:id')
  public async findUserInfo(@Param('id') id: string) {
    const count = await this.blogService.findUserInfo(id);
    return count;
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

  @Post('/repost/:id')
  public async repostById(
    @Param('id') id: string,
    @Body() dto: RepostBlogDto
    ) {
    const blog = await this.blogService.repostById(id, dto.userId);
    return blog;
  }
}
