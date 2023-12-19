import { Expose, Transform } from 'class-transformer';

export class UserRdo {
  @Expose()
  @Transform((query) => query.obj['_id'])
  public id: string;

  @Expose()
  public avatar: string;

  @Expose()
  public email: string;

  @Expose()
  public name: string;
}
