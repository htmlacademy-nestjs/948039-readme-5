import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsMongoId, IsOptional } from 'class-validator';

export class UserRdo {
  @Expose()
  @Transform((query) => query.obj['id'])
  @ApiProperty({
    description: 'айди пользователя',
  })
  public id: string;

  @Expose()
  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    description: 'Путь до аватара пользователя',
  })
  public avatarId?: string;

  @Expose()
  @ApiProperty({
    description: 'Почтовый адрес пользователя',
  })
  public email: string;

  @Expose()
  @ApiProperty({
    description: 'Имя пользователя',
  })
  public name: string;

  @Expose()
  @ApiProperty({
    description: 'Дата регистрации',
  })
  public createdAt: Date;
}
