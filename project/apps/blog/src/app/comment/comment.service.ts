import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { BlogRepository } from '../blog/blog.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRepository } from './comment.repository';
import { CommentEntity } from './comment.entity';
import { fillDto } from '@project/libs/helpers';
import { CommentRdo } from './rdo/comment.rdo';
import { CommentQuery } from './query/comment-query';
import { CommentsWithPaginationRdo } from './rdo/comments.rdo';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly blogRepository: BlogRepository
  ) {}
  public async create(dto: CreateCommentDto) {
    const existBlog = await this.blogRepository.findById(dto.blogId);
    if (!existBlog) {
      throw new NotFoundException();
    }
    const commentEntity = new CommentEntity(dto);
    const comment = await this.commentRepository.save(commentEntity);
    return fillDto(CommentRdo, comment);
  }

  public async find(blogId: string, query: CommentQuery) {
    const comments = await this.commentRepository.find(blogId, query);
    return fillDto(CommentsWithPaginationRdo, comments);
  }

  public async deleteById(id: string, userId: string) {
    const existComment = await this.commentRepository.findById(id);
    if (!existComment) {
      throw new NotFoundException();
    }

    if (existComment.userId !== userId) {
      throw new ForbiddenException();
    }
    const comment = await this.commentRepository.deleteById(id);
    return comment;
  }
}
