import { BlogType } from '@project/libs/app/types';

export const BLOG_REPOSITORY_MAP = {
  [BlogType.Video]: 'videoBlogRepository',
  [BlogType.Text]: 'textBlogRepository',
  [BlogType.Link]: 'linkBlogRepository',
  [BlogType.Photo]: 'photoBlogRepository',
  [BlogType.Quote]: 'quoteBlogRepository',
}
