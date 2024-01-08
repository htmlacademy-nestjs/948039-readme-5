import { Expose } from 'class-transformer';

export class QuoteBlogContent {
  @Expose()
  quote: string;
  @Expose()
  author: string;
  @Expose()
  id?: string;

  blogId: string;
}
