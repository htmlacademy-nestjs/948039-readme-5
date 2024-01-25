import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMongoId, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@user.ru',
    required: true,
  })
  public email: string;

  @IsString()
  @Length(3, 50)
  @ApiProperty({
    description: 'User name',
    example: 'Ivan Ivanovich',
    required: true,
  })
  public name: string;

  @IsString()
  @Length(6, 12)
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
