import { Injectable } from '@nestjs/common';
import { VideoBlogRepository } from '../video-blog-content/video-blog.repository';
import { TextBlogRepository } from '../text-blog-content/text-blog.repository';
import { BaseBlogContentEntity } from './content-blog.entity';
import { BlogType } from '@project/libs/app/types';
import { VideoBlogEntity } from '../video-blog-content/video-blog.entity';
import { TextBlogEntity } from '../text-blog-content/text-blog.entity';
import { LinkBlogRepository } from '../link-blog-content/link-blog.repository';
import { LinkBlogEntity } from '../link-blog-content/link-blog.entity';

const BLOG_REPOSITORY_MAP = {
  [BlogType.Video]: 'videoBlogRepository',
  [BlogType.Text]: 'textBlogRepository',
  [BlogType.Link]: 'linkBlogRepository',
  [BlogType.Photo]: 'photoBlogRepository',
  [BlogType.Quote]: 'quoteBlogRepository',
}

@Injectable()
export class BaseBlogContentService {
  constructor(
    private readonly videoBlogRepository: VideoBlogRepository,
    private readonly textBlogRepository: TextBlogRepository,
    private readonly linkBlogRepository: LinkBlogRepository,
  ) {}

    public async save(type: BlogType, entity: BaseBlogContentEntity) {
      if (type) {
      return this[BLOG_REPOSITORY_MAP[type]].save(entity)
      }
      throw new Error('Not implements blog type');
    }

    public async findById(type: BlogType, id: string) {
      if (type) {
        return this[BLOG_REPOSITORY_MAP[type]].save(id)
      }
      throw new Error('Not implements blog type');
    }

    public async update(type: BlogType, id: string, entity: BaseBlogContentEntity) {
      if (type) {
        return this[BLOG_REPOSITORY_MAP[type]].update(id, entity);
      }
      throw new Error('Not implements blog type');
    }

    public async deleteById(type: BlogType, id: string) {
      if (type) {
        return this[BLOG_REPOSITORY_MAP[type]].deleteById(id);
      }
      throw new Error('Not implements blog type');
    }
}
