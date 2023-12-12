import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWROD_WRONG } from './authentication.constants';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository
  ) {}

  public async register(dto: CreateUserDto) {
    const {email, avatar, name, password} = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);
    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const blogUser = {
      email,
      name,
      avatar: avatar ?? 'default-avatar.png',
      passwordHash: ''
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);
    return this.blogUserRepository.save(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const userEntity = new BlogUserEntity(existUser);
    const isComparePassword = await userEntity.comparePassword(password);

    if (!isComparePassword) {
      throw new UnauthorizedException(AUTH_USER_PASSWROD_WRONG);
    }

    return userEntity.toPlainObject();
  }

  public async changePassword(dto: ChangePasswordDto) {
    const {oldPassword, newPassword, id} = dto;
    const existUser = await this.blogUserRepository.findById(id);
    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }
    const userEntity = new BlogUserEntity(existUser);
    const isComparePassword = await userEntity.comparePassword(oldPassword);
    if (!isComparePassword) {
      throw new UnauthorizedException(AUTH_USER_PASSWROD_WRONG);
    }
    await userEntity.setPassword(newPassword)
    return this.blogUserRepository.save(userEntity);
  }
}
