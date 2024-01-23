import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { BlogRepository } from '../blog/blog.repository';
import { PrismaClientService } from '@project/libs/blog/models';
import { BaseBlogContentService } from '../blog/base-blog/base-blog.service';
import { LinkBlogRepository } from '../blog/link-blog-content/link-blog.repository';
import { PhotoBlogRepository } from '../blog/photo-blog-content/photo-blog.repository';
import { QuoteBlogRepository } from '../blog/quote-blog-content/quote-blog.repository';
import { TextBlogRepository } from '../blog/text-blog-content/text-blog.repository';
import { VideoBlogRepository } from '../blog/video-blog-content/video-blog.repository';
import { NotifyModule } from '../notify/notify.module';

@Module({
  imports: [NotifyModule],
  providers: [TasksService,BlogRepository, PrismaClientService, BaseBlogContentService,VideoBlogRepository,TextBlogRepository, LinkBlogRepository, PhotoBlogRepository, QuoteBlogRepository],
})
export class TasksModule {}
