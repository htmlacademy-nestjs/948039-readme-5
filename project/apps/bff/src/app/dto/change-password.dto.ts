import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, Length } from 'class-validator';
import { MAX_PASSWORD_LENGHT, MIN_PASSWORD_LENGHT } from '../constants';

export class ChangePasswordDto {
  @IsString()
  @Length(MIN_PASSWORD_LENGHT, MAX_PASSWORD_LENGHT)
  @ApiProperty({
    description: 'old password',
    example: 'test1234',
    required: true
  })
  public oldPassword: string;

  @IsString()
  @Length(MIN_PASSWORD_LENGHT, MAX_PASSWORD_LENGHT)
  @ApiProperty({
    description: 'new password',
    example: 'test12345',
    required: true
  })
  public newPassword: string;

  @IsMongoId()
  @ApiProperty({
    description: 'valid mongoId',
    required: true
  })
  public id: string;
}
