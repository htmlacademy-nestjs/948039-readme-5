import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogUserRepository } from './blog-user.repository';

@Injectable()
export class BlogUserService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository
  ) {}

  public async getUser(id: string) {
    const existUser = await this.blogUserRepository.findById(id);

    if (! existUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return existUser;
  }
}
