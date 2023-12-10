import { BlogType, LinkBlogContent, PhotoBlogContent, QuoteBlogContent, TextBlogContent, VideoBlogContent } from '@project/libs/app/types';

export type BlogContent = LinkBlogContent | TextBlogContent | VideoBlogContent | PhotoBlogContent | QuoteBlogContent;

export class CreateBlogDto {
  public type: BlogType;
  public content: BlogContent;
  public author: string;
  public tags: string[];
}
