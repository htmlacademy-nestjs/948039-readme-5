import { Injectable } from '@nestjs/common';
import { BlogUserRepository } from './blog-user.repository';

@Injectable()
export class BlogUserService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository
  ) {}

  public async getUser(id: string) {
    return this.blogUserRepository.findById(id);
  }
}
