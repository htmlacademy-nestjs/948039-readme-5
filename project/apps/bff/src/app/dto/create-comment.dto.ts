import { IsMongoId, IsString, Length } from 'class-validator';
import { MIN_COMMENT_LENGHT, MAX_COMMENT_LENGHT } from '../constants';

export class CreateCommentDto {
  @IsString()
  @Length(MIN_COMMENT_LENGHT, MAX_COMMENT_LENGHT)
  public message: string;

  @IsMongoId()
  public userId: string;
}
