import { BlogContent, BlogStatus, BlogType, LinkBlogContent, PhotoBlogContent, QuoteBlogContent, TextBlogContent, VideoBlogContent } from '@project/libs/app/types';
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
            { value: VideoBlogContent, name: BlogType.Video },
            { value: TextBlogContent, name: BlogType.Text },
            { value: LinkBlogContent, name: BlogType.Link },
            { value: PhotoBlogContent, name: BlogType.Photo },
            { value: QuoteBlogContent, name: BlogType.Quote },
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
