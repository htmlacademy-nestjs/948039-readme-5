import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';
import {BlogConfigModule} from '@project/libs/config/blog';

@Module({
  imports: [BlogModule, LikeModule, CommentModule, BlogConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
