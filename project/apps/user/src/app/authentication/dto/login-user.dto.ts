import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { MAX_PASSWORD_LENGHT, MIN_PASSWORD_LENGHT } from '../authentication.constants';

export class LoginUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@user.ru',
    required: true,
  })
  public email: string;

  @IsString()
  @Length(MIN_PASSWORD_LENGHT, MAX_PASSWORD_LENGHT)
  @ApiProperty({
    description: 'User password',
    required: true,
  })
  public password: string;
}
