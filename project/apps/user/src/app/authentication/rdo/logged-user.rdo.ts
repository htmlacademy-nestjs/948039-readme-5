import { Expose, Transform } from 'class-transformer';
export class LoggedUserRdo {
  @Transform((query) => query.obj['id'])
  @Expose()
  public id: string;

  @Expose()
  public email: string;

  @Expose()
  public accessToken: string;
}
