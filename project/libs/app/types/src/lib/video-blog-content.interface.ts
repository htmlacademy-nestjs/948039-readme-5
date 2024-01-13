import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Length ,IsUrl, Matches} from 'class-validator';

export class VideoBlogContentCreate {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @Length(20, 50)
  name: string;

  @Expose()
  @IsUrl()
  @Matches(
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([^&#\?]{11})/,
    {message: 'type valid youtube url adress for video'}
  )
  link: string;
}

export class VideoBlogContent extends VideoBlogContentCreate {
  @Expose()
  id?: string;

  blogId?: string;
}
