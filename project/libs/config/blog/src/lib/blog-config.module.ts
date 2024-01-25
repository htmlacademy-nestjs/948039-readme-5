import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import blogConfig from './blog.config';
import rabbitConfig from './rabbit.config';

const ENV_FILE_PATH = 'apps/blog/blog.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [blogConfig, rabbitConfig],
      envFilePath: ENV_FILE_PATH
    }),
  ]
})
export class BlogConfigModule {}
