import { Body, Controller, Post, Get, Param, Put, Delete } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.tdo';

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
  public async find() {
    const blog = await this.blogService.find();
    return blog;
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
    await this.blogService.deleteById(id);
    return {};
  }
}
