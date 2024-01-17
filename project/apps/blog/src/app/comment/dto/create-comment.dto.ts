import { IsMongoId, IsString, IsUUID, Length } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @Length(10, 300)
  public message: string;

  @IsUUID()
  public blogId: string;

  @IsMongoId()
  public userId: string;
}
