import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { BlogController } from './blog.controller';
import { HTTP_CLIENT_TIMEOUT, HTTP_CLIENT_MAX_REDIRECTS } from './app.config';
import {HttpModule} from '@nestjs/axios';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    })
  ],
  controllers: [UsersController, BlogController],
  providers: [CheckAuthGuard],
})
export class AppModule {}
