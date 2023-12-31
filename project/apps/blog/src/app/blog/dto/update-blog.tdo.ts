import { BlogStatus, BlogType, LinkBlogContent, PhotoBlogContent, QuoteBlogContent, TextBlogContent, VideoBlogContent } from '@project/libs/app/types';

export type BlogContent = LinkBlogContent | TextBlogContent | VideoBlogContent | PhotoBlogContent | QuoteBlogContent;

export class UpdateBlogDto {
  content: BlogContent;
  status: BlogStatus;
  type: BlogType;
  tags: string[];
}
