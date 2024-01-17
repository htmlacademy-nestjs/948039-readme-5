import { IsMongoId, IsString, Length } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @Length(6, 12)
  public oldPassword: string;

  @IsString()
  @Length(6, 12)
  public newPassword: string;

  @IsMongoId()
  public id: string;
}
