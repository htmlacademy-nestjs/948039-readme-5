import { BlogType } from '@project/libs/app/types';
import { VideoBlogEntity } from '../video-blog-content/video-blog.entity';
import { TextBlogEntity } from '../text-blog-content/text-blog.entity';
import { BlogContent } from '../dto/create-blog.dto';
import { LinkBlogEntity } from '../link-blog-content/link-blog.entity';

export const baseBlogEntityFactory = (type: BlogType, content: BlogContent) => {
  switch(type) {
    case (BlogType.Video):
      return new VideoBlogEntity(content as any);
      case (BlogType.Text):
        return new TextBlogEntity(content as any);
      case (BlogType.Link):
        return new LinkBlogEntity(content as any);
      default:
      throw new Error('Not implements blog type');
  }
}
