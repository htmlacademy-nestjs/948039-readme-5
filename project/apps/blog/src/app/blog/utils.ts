import { BlogType } from '@project/libs/app/types';
import { VideoBlogEntity } from './video-blog-content/video-blog.entity';
import { LinkBlogEntity } from './link-blog-content/link-blog.entity';
import { PhotoBlogEntity } from './photo-blog-content/photo-blog.entity';
import { QuoteBlogEntity } from './quote-blog-content/quote-blog.entity';
import { TextBlogEntity } from './text-blog-content/text-blog.entity';

export type UnionBlogEntity = VideoBlogEntity | TextBlogEntity | LinkBlogEntity | PhotoBlogEntity | QuoteBlogEntity;

export const isVideoBlogEntity = (type: BlogType, entity: UnionBlogEntity): entity is VideoBlogEntity => {
  return type === BlogType.Video;
}

export const isTextBlogEntity = (type: BlogType, entity: UnionBlogEntity): entity is TextBlogEntity => {
  return type === BlogType.Text;
}

export const isLinkBlogEntity = (type: BlogType, entity: UnionBlogEntity): entity is LinkBlogEntity => {
  return type === BlogType.Link;
}

export const isPhotoBlogEntity = (type: BlogType, entity: UnionBlogEntity): entity is PhotoBlogEntity => {
  return type === BlogType.Photo;
}

export const isQuoteBlogEntity = (type: BlogType, entity: UnionBlogEntity): entity is QuoteBlogEntity => {
  return type === BlogType.Quote;
}
