import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/core';
import { LikeEntity } from './like.entity';
import { PrismaClientService } from '@project/libs/blog/models';
import { Like } from '@project/libs/app/types';

@Injectable()
export class LikeRepository extends BasePostgresRepository<LikeEntity, Like> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, LikeEntity.fromObject);
  }
  public async setLike(blogId: string, userId: string) {
    const userId_blogId = {userId, blogId};
    const existLike = await this.client.like.findUnique({
      where: {
        userId_blogId
      }
    })
    let like
    if (existLike) {
      like = await this.client.like.delete({
        where: {
          userId_blogId
        }
      })
    } else {
      like = await this.client.like.create({
        data: userId_blogId
      })
    }
    return like;
  }
}
