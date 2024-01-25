import { Expose } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class PhotoBlogContentCreate {
  @Expose()
  @IsNotEmpty()
  @IsMongoId()
  photoId: string;

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
