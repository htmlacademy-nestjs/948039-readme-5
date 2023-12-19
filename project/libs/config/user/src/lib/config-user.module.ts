import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { default as applicationConfig } from './app.config';
import {default as mongoConfig } from './mongo.config';

const ENV_USERS_FILE_PATH = 'apps/user/user.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // TODO: Передать список конфигураций для загрузки
      load: [applicationConfig, mongoConfig],
      envFilePath: ENV_USERS_FILE_PATH
    }),
  ]
})
export class ConfigUserModule {}
