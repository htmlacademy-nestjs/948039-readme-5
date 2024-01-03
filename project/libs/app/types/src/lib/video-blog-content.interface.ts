import { Expose } from 'class-transformer';

export class VideoBlogContent {
  @Expose()
  name: string;
  @Expose()
  link: string;
  @Expose()
  id?: string;

  blogId: string;
}
