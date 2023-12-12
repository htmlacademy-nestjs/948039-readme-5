import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogRepository } from './blog.repository';
import { VideoBlogRepository } from './video-blog-content/video-blog.repository';
import { BaseBlogContentService } from './base-blog/base-blog.service';
import { TextBlogRepository } from './text-blog-content/text-blog.repository';
import { LinkBlogRepository } from './link-blog-content/link-blog.repository';
import { PhotoBlogRepository } from './photo-blog-content/photo-blog.repository';
import { QuoteBlogRepository } from './quote-blog-content/quote-blog.repository';

@Module({
  imports: [],
  controllers: [BlogController],
  providers: [BlogService, BlogRepository, VideoBlogRepository, TextBlogRepository, LinkBlogRepository, PhotoBlogRepository, QuoteBlogRepository, BaseBlogContentService],
  exports: [BlogRepository]
})
export class BlogModule {}
