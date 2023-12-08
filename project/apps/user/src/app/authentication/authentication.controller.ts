import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import {fillDto} from '@project/libs/helpers';
import { UserRdo } from './rdo/user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
@Controller('auth')
export class AuthenticationController {
  constructor(
    public readonly authService: AuthenticationService
  ) {}

  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillDto(UserRdo, newUser.toPlainObject());
  }

  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const loggedUser = await this.authService.verifyUser(dto);
    return fillDto(LoggedUserRdo, {...loggedUser, accessToken: 'Bearer lalalala'})
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.authService.getUser(id);
    return fillDto(UserRdo, existUser.toPlainObject());
  }
 }
