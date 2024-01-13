import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class QuoteBlogContentCreate {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @Length(20, 300)
  quote: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  author: string;
}

export class QuoteBlogContent extends QuoteBlogContentCreate {
  @Expose()
  id?: string;

  blogId?: string;
}
