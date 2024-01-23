import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@user.ru',
    required: true,
  })
  public email: string;

  @IsString()
  @Length(6, 12)
  @ApiProperty({
    description: 'User password',
    required: true,
  })
  public password: string;
}
