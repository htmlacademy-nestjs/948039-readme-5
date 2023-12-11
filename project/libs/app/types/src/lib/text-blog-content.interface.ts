import { Expose } from 'class-transformer';

export class TextBlogContent {
  @Expose()
  name: string;
  @Expose()
  annotation: string;
  @Expose()
  content: string;
  @Expose()
  id?: string;
}
