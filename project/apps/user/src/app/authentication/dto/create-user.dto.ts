import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMongoId, IsOptional, IsString, Length } from 'class-validator';
import { MAX_PASSWORD_LENGHT, MAX_USERNAME_LENGHT, MIN_PASSWORD_LENGHT, MIN_USERNAME_LENGHT } from '../authentication.constants';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@user.ru',
    required: true,
  })
  public email: string;

  @IsString()
  @Length(MIN_USERNAME_LENGHT, MAX_USERNAME_LENGHT)
  @ApiProperty({
    description: 'User name',
    example: 'Ivan Ivanovich',
    required: true,
  })
  public name: string;

  @IsString()
  @Length(MIN_PASSWORD_LENGHT, MAX_PASSWORD_LENGHT)
  @ApiProperty({
    description: 'Password',
    example: '123456',
    required: true,
  })
  public password: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    description: 'avatar id',
    nullable: true
  })
  public avatarId?: string;
}
