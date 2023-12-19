import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from './authentication/authentication.module';
import { BlogUserModule } from './blog-user/blog-user.module';
import { ConfigUserModule, getMongooseOptions } from '@project/libs/config/user';
@Module({
  imports: [
    AuthenticationModule,
    BlogUserModule,
    ConfigUserModule,
    MongooseModule.forRootAsync(
    getMongooseOptions()
  )],
  controllers: [],
  providers: [],
})
export class AppModule {}
