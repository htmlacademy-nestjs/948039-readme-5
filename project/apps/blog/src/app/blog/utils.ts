import { BlogStatus, BlogType, SortDirection, SortType } from '@project/libs/app/types';
import { VideoBlogEntity } from './video-blog-content/video-blog.entity';
import { LinkBlogEntity } from './link-blog-content/link-blog.entity';
import { PhotoBlogEntity } from './photo-blog-content/photo-blog.entity';
import { QuoteBlogEntity } from './quote-blog-content/quote-blog.entity';
import { TextBlogEntity } from './text-blog-content/text-blog.entity';
import { Prisma } from '@prisma/client';

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

export interface BlogSorting {
  sort?: SortType;
  direction?: SortDirection;
}

export interface BlogFilter {
  type?: BlogType,
  search?: string,
  tag?: string,
}

export function blogFilter(filter: BlogFilter): Prisma.BlogWhereInput | undefined {
  if (!filter) {
    return undefined;
  }

  let prismaFilter: Prisma.BlogWhereInput = {
    status: BlogStatus.Public
  };

  if (filter.tag) {
    prismaFilter.tags = {
      hasSome: [filter.tag]
    };
  }

  if (filter.search) {
    prismaFilter.OR = [
      {videoBlog: {name: {contains: filter.search}}},
      {textBlog: {name: {contains: filter.search}}},
    ];
  }

  if (filter.type) {
    prismaFilter.type = filter.type;
  }

  return prismaFilter;
}

export function blogSort(sortParams: BlogSorting): Prisma.BlogOrderByWithRelationInput | undefined {
  if (!sortParams) {
    return undefined;
  }
  const {sort, direction} = sortParams;
  let prismaFilter: Prisma.BlogOrderByWithRelationInput = {};
  if (sort === SortType.Date) {
    prismaFilter = {[sort]: direction}
  }

  if (sort === SortType.Likes || sort === SortType.Comments) {
    prismaFilter = { [sort]: {
      _count: direction
    } };
  }

  return prismaFilter;
}
