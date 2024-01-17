import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentQuery } from './query/comment-query';
import { DeleteCommentDto } from './dto/delete-comment.dto';


@Controller('comment')
export class CommentController {
  constructor(
    public readonly commentService: CommentService
  ) { }

  @Post()
  public async create(@Body() dto: CreateCommentDto) {
    const comment = await this.commentService.create(dto);
    return comment;
  }

  @Get(':id')
  public async find(
    @Param('id') blogId: string,
    @Query() query: CommentQuery,
    ) {
    const comments = await this.commentService.find(blogId, query);
    return comments;
  }

  @Delete(':id')
  public async delete(
    @Param('id') id: string,
    @Body() dto: DeleteCommentDto,
    ) {
    const comment = await this.commentService.deleteById(id, dto.userId);
    return comment;
  }
}
