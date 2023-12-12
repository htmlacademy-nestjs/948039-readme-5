import { Injectable } from '@nestjs/common';
import {BaseMemoryRepository} from '@project/core';
import { LikeEntity } from './like.entity';

@Injectable()
export class LikeRepository extends BaseMemoryRepository<LikeEntity> {
  public async getAllById(blogId: string) {
    const entities = Array.from(this.entities.values());
    let count = entities.filter(entity => entity.blogId === blogId).length;
    return count;
  }

  public async setLike(blogId: string, userId: string) {
    const entities = Array.from(this.entities.values());
    let user = entities.find(entity => (entity.userId === userId) && (entity.blogId === blogId));
    if (user === undefined) {
      const likeEntity = new LikeEntity({blogId, userId})
      user = await this.save(likeEntity);
      return Promise.resolve(user);
    } else {
      await this.deleteById(user.id);
      return Promise.resolve(null);
    }
  }
}
