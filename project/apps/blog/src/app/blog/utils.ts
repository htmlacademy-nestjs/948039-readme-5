import { BlogContent, BlogType, VideoBlogContent } from '@project/libs/app/types';

export const isVideoBlogConent = (type: BlogType, content: BlogContent): content is VideoBlogContent => {
  return type === BlogType.Video;
}
