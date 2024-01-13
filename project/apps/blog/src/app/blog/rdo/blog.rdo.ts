import { BlogContent, BlogStatus, BlogType, LinkBlogContent, PhotoBlogContent, QuoteBlogContent, TextBlogContent, VideoBlogContent } from '@project/libs/app/types';
import { Expose, Type } from 'class-transformer';

export class BlogRdo {
  @Expose()
  public type: BlogType;

  @Expose()
  @Type((opts) => {
    const type = opts.object.type;
    if(type === BlogType.Video) {
      return VideoBlogContent
    }
    if(type === BlogType.Text) {
      return TextBlogContent
    }
    if(type === BlogType.Link) {
      return LinkBlogContent
    }
    if(type === BlogType.Photo) {
      return PhotoBlogContent
    }
    if(type === BlogType.Quote) {
      return QuoteBlogContent
    }
  } )
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
  public userId: string;

  @Expose()
  public tags: string[];

  @Expose()
  public repost: boolean;

  @Expose()
  public repostId?: string;
}
