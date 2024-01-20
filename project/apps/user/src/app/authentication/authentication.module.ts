import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { BlogUserModule } from '../blog-user/blog-user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/libs/config/user';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { NotifyModule } from '../notify/notify.module';
@Module({
  imports: [
    BlogUserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    }),
    NotifyModule
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtAccessStrategy
  ],
})
export class AuthenticationModule {}
