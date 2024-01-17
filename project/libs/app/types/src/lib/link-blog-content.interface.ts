import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsOptional, IsUrl, MaxLength } from 'class-validator';

export class LinkBlogContentCreate {
  @Expose()
  @IsNotEmpty()
  @IsUrl()
  link: string;

  @Expose()
  @IsString()
  @IsOptional()
  @MaxLength(300)
  description?: string;
}

export class LinkBlogContent extends LinkBlogContentCreate {
  @Expose()
  id?: string;

  blogId?: string;
}
