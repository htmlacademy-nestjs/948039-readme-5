import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class TextBlogContentCreate {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @Length(20, 50)
  name: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @Length(50, 255)
  annotation: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @Length(100, 1024)
  content: string;
}

export class TextBlogContent extends TextBlogContentCreate {
  @Expose()
  id?: string;

  blogId?: string;
}
