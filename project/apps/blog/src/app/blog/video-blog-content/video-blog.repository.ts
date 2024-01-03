import { Injectable } from '@nestjs/common';
import {BaseMemoryRepository, BasePostgresRepository} from '@project/core';
import { VideoBlogEntity } from './video-blog.entity';
import { PrismaClientService } from '@project/libs/blog/models';
import { VideoBlogContent } from '@project/libs/app/types';

@Injectable()
export class VideoBlogRepository extends BasePostgresRepository<VideoBlogEntity, VideoBlogContent> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, VideoBlogEntity.fromObject);
  }

  public async save(entity: VideoBlogEntity): Promise<VideoBlogEntity> {
    const record = await this.client.videoBlog.create({
      data: { ...entity.toPlainObject() }
    });

    entity.id = record.id;
    return entity;
  }
}
