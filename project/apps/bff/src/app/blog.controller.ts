import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CreateBlogDto } from './dto/add-new-post.dto';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { BlogQuery } from './query/blog-query';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { RepostBlogDto } from './dto/repost-blog.dto';
import { SetLikeDto } from './dto/set-like';
import { CreateCommentDto } from './dto/create-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { CommentQuery } from './query/comment-query';

@Controller('blog')
@UseFilters(AxiosExceptionFilter)
export class BlogController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('')
  public async create(@Body() dto: CreateBlogDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/`, dto);
    return data;
  }


  @Get('')
  public async find(@Query() query: BlogQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/`, {
      params: query
    });
    return data;
  }

  @Get(':id')
  public async findById(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/${id}`);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Put(':id')
  public async updateById(
    @Body() dto: UpdateBlogDto,
    @Param('id') id: string
    ) {
      const { data } = await this.httpService.axiosRef.put(`${ApplicationServiceURL.Blog}/${id}`, dto);
      return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Delete(':id')
  public async deleteById(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Blog}/${id}`);
    return data;
  }


  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('/repost/:id')
  public async repostById(
    @Param('id') id: string,
    @Body() dto: RepostBlogDto
    ) {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/repost/${id}`, dto);
      return data;
  }


  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Put('/:id/like')
  public async setLike(
    @Param('id') blogId: string,
    @Body() dto: SetLikeDto
    ) {
      const { data } = await this.httpService.axiosRef.put(`${ApplicationServiceURL.Like}`, {...dto, blogId});
      return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('/:id/comment')
  public async createComment(
    @Param('id') blogId: string,
    @Body() dto: CreateCommentDto
    ) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Comment}`, {...dto, blogId});
    return data;
  }

  @Get(':id/comment')
  public async findComments(
    @Param('id') blogId: string,
    @Query() query: CommentQuery,
    ) {
      const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comment}/${blogId}`,{
        params: query
      });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Delete('comment/:id')
  public async delete(
    @Param('id') id: string,
    @Body() dto: DeleteCommentDto,
    ) {
      const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Comment}/${id}`, {
        data: dto
      } as any);
      return data;
  }
}
