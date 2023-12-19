import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogUserRepository } from './blog-user.repository';
import { BlogUserController } from './blog-user.controller';
import { BlogUserService } from './blog-user.service';
import { BlogUserModel, BlogUserSchema } from './blog-user.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: BlogUserModel.name, schema: BlogUserSchema }
  ])],
  controllers: [BlogUserController],
  providers: [BlogUserRepository, BlogUserService],
  exports: [BlogUserRepository],
})
export class BlogUserModule {}
