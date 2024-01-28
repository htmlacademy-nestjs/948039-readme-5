import { Body, Controller, Get, Headers, NotAcceptableException, Param, Post, Put, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApplicationServiceURL } from './app.config';
import { HttpService } from '@nestjs/axios';
import { LoginUserDto } from './dto/login-user.dto';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, loginUserDto);
    return data;
  }

  @Post('register')
  public async register(
    @Headers('authorization') auth: string | undefined,
    @Body() createUserDto: CreateUserDto
  ) {
    if (auth) {
      throw new NotAcceptableException()
    }

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/register`, createUserDto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Put('password')
  public async changePassword(@Req() req: Request & {user: any}, @Body() changePasswordDto: ChangePasswordDto) {
    const id = req.user.sub;
    const { data } = await this.httpService.axiosRef.put(`${ApplicationServiceURL.Users}/password`, {id, ...changePasswordDto}, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @Get(':id')
  public async getUserById(@Param('id') id: string) {
    const {data: userInfo} = await this.httpService.axiosRef.get(`${ApplicationServiceURL.UsersInfo}/${id}`);
    const {data: blogCount} = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/user/${id}`);
    return {...userInfo, blogCount};
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }
}
