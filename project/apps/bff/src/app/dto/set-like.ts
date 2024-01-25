import { IsMongoId } from 'class-validator';

export class SetLikeDto {
  @IsMongoId()
  public userId: string;
}
