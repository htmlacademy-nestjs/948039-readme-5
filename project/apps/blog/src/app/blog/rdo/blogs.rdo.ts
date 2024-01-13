import { Expose, Type } from 'class-transformer';
import { BlogItemRdo } from './blog-item.rdo';
import { PaginationRdo } from './pagination.rdo';

export class BlogPostWithPaginationRdo {
  @Expose()
  @Type(() => BlogItemRdo)
  public data: BlogItemRdo[];

  @Expose()
  @Type(() => PaginationRdo)
  public pagination: PaginationRdo;
}
