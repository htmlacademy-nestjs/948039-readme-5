import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeRepository } from './like.repository';
import { LikeService } from './like.service';
import { PrismaClientService } from '@project/libs/blog/models';
import { BlogRepository } from '../blog/blog.repository';
import { BaseBlogContentService } from '../blog/base-blog/base-blog.service';
import { LinkBlogRepository } from '../blog/link-blog-content/link-blog.repository';
import { PhotoBlogRepository } from '../blog/photo-blog-content/photo-blog.repository';
import { QuoteBlogRepository } from '../blog/quote-blog-content/quote-blog.repository';
import { TextBlogRepository } from '../blog/text-blog-content/text-blog.repository';
import { VideoBlogRepository } from '../blog/video-blog-content/video-blog.repository';

@Module({
  imports: [],
  controllers: [LikeController],
  providers: [LikeRepository, LikeService, PrismaClientService, BlogRepository, VideoBlogRepository, TextBlogRepository, LinkBlogRepository, PhotoBlogRepository, QuoteBlogRepository, BaseBlogContentService],
})
export class LikeModule {}
