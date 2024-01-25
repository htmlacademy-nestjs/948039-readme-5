import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
export class LoggedUserRdo {
  @Expose()
  @ApiProperty({
    description: 'Аксесс токен',
  })
  public accessToken: string;

  @Expose()
  @ApiProperty({
    description: 'Рефреш токен',
  })
  public refreshToken: string;
}
