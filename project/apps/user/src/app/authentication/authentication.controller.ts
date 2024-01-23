import { Body, Controller, HttpCode, HttpStatus, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillDto } from '@project/libs/helpers';
import { UserRdo } from './rdo/user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { NotifyService } from '../notify/notify.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { ApiResponse } from '@nestjs/swagger';
import { RequestWithTokenPayload } from '@project/libs/app/types';

interface RequestWithUser {
  user?: BlogUserEntity
}

@Controller('auth')
export class AuthenticationController {
  constructor(
    public readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService,
  ) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'Регистрация пользователя'
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const { email, name } = dto;
    const newUser = await this.authService.register(dto);
    await this.notifyService.registerSubscriber({ email, name });
    return fillDto(UserRdo, newUser.toPlainObject());
  }

  @UseGuards(LocalAuthGuard)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.CREATED,
    description: 'Авторизация пользователя'
  })
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    const userToken = await this.authService.createUserToken(user);
    return fillDto(LoggedUserRdo, userToken)
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'смена пароля авторизованным пользователем'
  })
  @Put('password')
  public async changePassword(@Body() dto: ChangePasswordDto) {
    await this.authService.changePassword(dto);
    return {};
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Получить новый токен'
  })
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Проврека валидности токена'
  })
  @Post('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }
 }
