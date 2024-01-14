import { Expose, Type } from 'class-transformer';
import { CommentRdo } from './comment.rdo';
import { PaginationRdo } from './pagination';

export class CommentsWithPaginationRdo {
  @Expose()
  @Type(() => CommentRdo)
  public data: CommentRdo[];

  @Expose()
  @Type(() => PaginationRdo)
  public pagination: PaginationRdo;
}
