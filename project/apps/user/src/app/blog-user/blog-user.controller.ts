import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { BlogUserService } from './blog-user.service';
import { fillDto } from '@project/libs/helpers';
import { UserRdo } from '../authentication/rdo/user.rdo';
import { MongoIdValidationPipe } from '@project/core';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';

@Controller('user')
export class BlogUserController {
  constructor(
    public readonly userService: BlogUserService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.userService.getUser(id);
    return fillDto(UserRdo, existUser.toPlainObject());
  }
}
