import { IsMongoId, IsUUID } from 'class-validator';

export class SetLikeDto {
  @IsMongoId()
  public userId: string;

  @IsUUID()
  public blogId: string;
}
