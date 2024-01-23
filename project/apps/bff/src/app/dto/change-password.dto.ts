import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, Length } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @Length(6, 12)
  @ApiProperty({
    description: 'old password',
    example: 'test1234',
    required: true
  })
  public oldPassword: string;

  @IsString()
  @Length(6, 12)
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
