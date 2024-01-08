import { LinkBlogContent } from './link-blog-content.interface';
import { PhotoBlogContent } from './photo-blog-content.interface';
import { QuoteBlogContent } from './quote-blog-content.interface';
import { TextBlogContent } from './text-blog-content.interface';
import { VideoBlogContent } from './video-blog-content.interface';

export class BaseBlogContent {
  id?: string;
}

export type BlogContent = LinkBlogContent | TextBlogContent | VideoBlogContent | PhotoBlogContent | QuoteBlogContent;
