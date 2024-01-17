import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class PhotoBlogContentCreate {
  @Expose()
  @IsNotEmpty()
  @IsString()
  path: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class PhotoBlogContent extends PhotoBlogContentCreate {
  @Expose()
  id?: string;

  blogId?: string;
}
