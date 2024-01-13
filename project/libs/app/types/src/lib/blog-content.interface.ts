import { LinkBlogContent, LinkBlogContentCreate } from './link-blog-content.interface';
import { PhotoBlogContent, PhotoBlogContentCreate } from './photo-blog-content.interface';
import { QuoteBlogContent, QuoteBlogContentCreate } from './quote-blog-content.interface';
import { TextBlogContent, TextBlogContentCreate } from './text-blog-content.interface';
import { VideoBlogContent, VideoBlogContentCreate } from './video-blog-content.interface';

export class BaseBlogContent {
  id?: string;
}

export type BlogContent = LinkBlogContent | TextBlogContent | VideoBlogContent | PhotoBlogContent | QuoteBlogContent;
export type BlogContentCreate = LinkBlogContentCreate | TextBlogContentCreate | VideoBlogContentCreate | PhotoBlogContentCreate | QuoteBlogContentCreate;
