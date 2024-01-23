import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { DEFAULT_COMMENT_COUNT_LIMIT, DEFAULT_COMMENT_PAGE_COUNT } from '../constants';


export class CommentQuery {
  @Transform(({ value }) => +value || DEFAULT_COMMENT_PAGE_COUNT)
  @IsOptional()
  public page: number = DEFAULT_COMMENT_PAGE_COUNT;


  @Transform(({ value }) => +value || DEFAULT_COMMENT_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public pageSize = DEFAULT_COMMENT_COUNT_LIMIT;
}
