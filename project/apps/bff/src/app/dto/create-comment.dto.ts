import { IsMongoId, IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @Length(10, 300)
  public message: string;

  @IsMongoId()
  public userId: string;
}
