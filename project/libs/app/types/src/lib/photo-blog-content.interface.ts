import { Expose } from 'class-transformer';

export class PhotoBlogContent {
  @Expose()
  path: string;
  @Expose()
  name: string;
  @Expose()
  id?: string;

  blogId: string;
}
