import { Controller, Get, Param } from '@nestjs/common';
import { BlogUserService } from './blog-user.service';
import { fillDto } from '@project/libs/helpers';
import { UserRdo } from '../authentication/rdo/user.rdo';

@Controller('user')
export class BlogUserController {
  constructor(
    public readonly userService: BlogUserService
  ) {}
  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.userService.getUser(id);
    return fillDto(UserRdo, existUser.toPlainObject());
  }
}
