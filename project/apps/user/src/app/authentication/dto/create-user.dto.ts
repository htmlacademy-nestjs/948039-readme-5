import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @Length(3, 50)
  public name: string;

  @IsString()
  @Length(6, 12)
  public password: string;

  @IsOptional()
  public avatar?: string;
}
