import { BlogType, LinkBlogContent, PhotoBlogContent, QuoteBlogContent, TextBlogContent, VideoBlogContent } from '@project/libs/app/types';
import { VideoBlogEntity } from '../video-blog-content/video-blog.entity';
import { TextBlogEntity } from '../text-blog-content/text-blog.entity';
import { BlogContent } from '../dto/create-blog.dto';
import { LinkBlogEntity } from '../link-blog-content/link-blog.entity';
import { PhotoBlogEntity } from '../photo-blog-content/photo-blog.entity';
import { QuoteBlogEntity } from '../quote-blog-content/quote-blog.entity';

export const baseBlogEntityFactory = (type: BlogType, content: BlogContent) => {
  switch(type) {
    case (BlogType.Video):
      return new VideoBlogEntity(content as VideoBlogContent);
      case (BlogType.Text):
        return new TextBlogEntity(content as TextBlogContent);
      case (BlogType.Link):
        return new LinkBlogEntity(content as LinkBlogContent);
      case (BlogType.Photo):
        return new PhotoBlogEntity(content as PhotoBlogContent);
      case (BlogType.Quote):
        return new QuoteBlogEntity(content as QuoteBlogContent);
      default:
      throw new Error('Not implements blog type');
  }
}
