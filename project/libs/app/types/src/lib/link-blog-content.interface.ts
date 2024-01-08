import { Expose } from 'class-transformer';

export class LinkBlogContent {
  @Expose()
  link: string;
  @Expose()
  description?: string;
  @Expose()
  id?: string;

  blogId: string;
}
