import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { BlogUserModule } from './blog-user/blog-user.module';
import {ConfigUserModule} from '@project/libs/config/user';
@Module({
  imports: [AuthenticationModule, BlogUserModule, ConfigUserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
