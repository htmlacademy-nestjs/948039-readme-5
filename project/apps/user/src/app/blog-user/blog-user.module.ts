import { Module } from '@nestjs/common';
import { BlogUserRepository } from './blog-user.repository';
import { BlogUserController } from './blog-user.controller';
import { BlogUserService } from './blog-user.service';

@Module({
  imports: [],
  controllers: [BlogUserController],
  providers: [BlogUserRepository, BlogUserService],
  exports: [BlogUserRepository],
})
export class BlogUserModule {}
