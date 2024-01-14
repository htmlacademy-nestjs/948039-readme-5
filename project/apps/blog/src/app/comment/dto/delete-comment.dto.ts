import { IsMongoId } from 'class-validator';

export class DeleteCommentDto {
  @IsMongoId()
  public userId: string;
}
