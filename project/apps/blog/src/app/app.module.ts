import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [BlogModule, LikeModule, CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
