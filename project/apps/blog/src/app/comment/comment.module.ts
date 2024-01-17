import { Module } from '@nestjs/common';
import { PrismaClientService } from '@project/libs/blog/models';
import { BlogRepository } from '../blog/blog.repository';
import { BaseBlogContentService } from '../blog/base-blog/base-blog.service';
import { LinkBlogRepository } from '../blog/link-blog-content/link-blog.repository';
import { PhotoBlogRepository } from '../blog/photo-blog-content/photo-blog.repository';
import { QuoteBlogRepository } from '../blog/quote-blog-content/quote-blog.repository';
import { TextBlogRepository } from '../blog/text-blog-content/text-blog.repository';
import { VideoBlogRepository } from '../blog/video-blog-content/video-blog.repository';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
  imports: [],
  controllers: [CommentController],
  providers: [CommentRepository, CommentService, PrismaClientService, BlogRepository, VideoBlogRepository, TextBlogRepository, LinkBlogRepository, PhotoBlogRepository, QuoteBlogRepository, BaseBlogContentService],
})
export class CommentModule {}
