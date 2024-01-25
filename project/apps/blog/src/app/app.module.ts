import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';
import {BlogConfigModule} from '@project/libs/config/blog';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    BlogModule,
    LikeModule,
    CommentModule,
    BlogConfigModule,
    ScheduleModule.forRoot(),
    TasksModule,
    NotifyModule
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
