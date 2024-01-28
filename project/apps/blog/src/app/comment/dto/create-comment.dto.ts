import { IsMongoId, IsString, IsUUID, Length } from 'class-validator';
import { MAX_COMMENT_LENGHT, MIN_COMMENT_LENGHT } from '../constants';

export class CreateCommentDto {
  @IsString()
  @Length(MIN_COMMENT_LENGHT, MAX_COMMENT_LENGHT)
  public message: string;

  @IsUUID()
  public blogId: string;

  @IsMongoId()
  public userId: string;
}
