import { Injectable } from '@nestjs/common';
import { VideoBlogRepository } from '../video-blog-content/video-blog.repository';
import { TextBlogRepository } from '../text-blog-content/text-blog.repository';
import { BlogType } from '@project/libs/app/types';
import { LinkBlogRepository } from '../link-blog-content/link-blog.repository';
import { PhotoBlogRepository } from '../photo-blog-content/photo-blog.repository';
import { QuoteBlogRepository } from '../quote-blog-content/quote-blog.repository';
import { BLOG_REPOSITORY_MAP } from './constants';
import { isLinkBlogEntity, isPhotoBlogEntity, isQuoteBlogEntity, isTextBlogEntity, isVideoBlogEntity, UnionBlogEntity } from '../utils';

@Injectable()
export class BaseBlogContentService {
  constructor(
    private readonly videoBlogRepository: VideoBlogRepository,
    private readonly textBlogRepository: TextBlogRepository,
    private readonly linkBlogRepository: LinkBlogRepository,
    private readonly photoBlogRepository: PhotoBlogRepository,
    private readonly quoteBlogRepository: QuoteBlogRepository,
  ) {}
    public async save(type: BlogType, entity: UnionBlogEntity) {
      if (isVideoBlogEntity(type, entity)) {
        return this.videoBlogRepository.save(entity);
      }
      if (isTextBlogEntity(type, entity)) {
        return this.textBlogRepository.save(entity);
      }
      if (isLinkBlogEntity(type, entity)) {
        return this.linkBlogRepository.save(entity);
      }
      if (isPhotoBlogEntity(type, entity)) {
        return this.photoBlogRepository.save(entity);
      }
      if (isQuoteBlogEntity(type, entity)) {
        return this.quoteBlogRepository.save(entity);
      }
      throw new Error('Not implements blog type');
    }

    public async findById(type: BlogType, id: string) {
      if (type) {
        return this[BLOG_REPOSITORY_MAP[type]].findById(id);
      }
      throw new Error('Not implements blog type');
    }

    public async update(type: BlogType, id: string, entity: UnionBlogEntity) {
      if (type) {
        if (isVideoBlogEntity(type, entity)) {
          return this.videoBlogRepository.update(id, entity);
        }
        if (isTextBlogEntity(type, entity)) {
          return this.textBlogRepository.update(id, entity);
        }
        if (isLinkBlogEntity(type, entity)) {
          return this.linkBlogRepository.update(id, entity);
        }
        if (isPhotoBlogEntity(type, entity)) {
          return this.photoBlogRepository.update(id, entity);
        }
        if (isQuoteBlogEntity(type, entity)) {
          return this.quoteBlogRepository.update(id, entity);
        }      }
      throw new Error('Not implements blog type');
    }

    public async deleteById(type: BlogType, id: string) {
      if (type) {
        return this[BLOG_REPOSITORY_MAP[type]].deleteById(id);
      }
      throw new Error('Not implements blog type');
    }
}
