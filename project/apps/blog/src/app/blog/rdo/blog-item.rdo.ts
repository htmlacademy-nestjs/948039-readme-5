import { Expose } from 'class-transformer';
import { BlogRdo } from './blog.rdo';

export class BlogItemRdo extends BlogRdo {
  @Expose()
  public comments: number;

  @Expose()
  public likes: number;
}
