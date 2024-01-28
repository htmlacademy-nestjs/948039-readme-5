import { ConflictException, HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWROD_WRONG } from './authentication.constants';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtToken, User } from '@project/libs/app/types';
import { ConfigType } from '@nestjs/config';
import { jwtConfig } from '@project/libs/config/user';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { createJWTPayload } from '@project/libs/helpers';
import * as crypto from 'node:crypto';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    @Inject (jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
  ) { }

  public async register(dto: CreateUserDto) {
    const {email, avatarId, name, password} = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);
    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const blogUser = {
      email,
      name,
      avatarId,
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
    return this.blogUserRepository.update(userEntity.id, userEntity);
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (! existUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return existUser;
  }

  public async createUserToken(user: User): Promise<JwtToken> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload)
    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      });
      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
