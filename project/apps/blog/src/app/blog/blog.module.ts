import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogRepository } from './blog.repository';
import { VideoBlogRepository } from './blog-content/video-blog-content/video-blog.repository';

@Module({
  imports: [],
  controllers: [BlogController],
  providers: [BlogService, BlogRepository, VideoBlogRepository],
})
export class BlogModule {}
