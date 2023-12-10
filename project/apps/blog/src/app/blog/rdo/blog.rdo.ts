import { BlogStatus, BlogType, VideoBlogContent } from '@project/libs/app/types';
import { BlogContent } from '../dto/create-blog.dto';
import { Expose, Type } from 'class-transformer';

export class BlogRdo {
  @Expose()
  public type: BlogType;

  @Expose()
  @Type(() => Object, {
    keepDiscriminatorProperty: true,
    discriminator: {
        property: "type",
        subTypes: [
            { value: VideoBlogContent, name: "video" },
        ]
    }
  })
  public content: BlogContent;

  @Expose()
  public createdDate: Date;

  @Expose()
  public postedDate: Date;

  @Expose()
  public id: string;

  @Expose()
  public status: BlogStatus;

  @Expose()
  public author: string;

  @Expose()
  public tags: string[];

  @Expose()
  public repost: boolean;

  @Expose()
  public repostId?: string;
}
