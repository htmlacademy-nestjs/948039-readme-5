import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/core';
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

  public async update(id: string, entity: VideoBlogEntity): Promise<VideoBlogEntity> {
    const record = await this.client.videoBlog.update({
      where: {blogId: id},
      data: entity.toPlainObject()
    });
    const content = new VideoBlogEntity(record);
    return content;
  }

  public async deleteById(id: string): Promise<null> {
    await this.client.videoBlog.delete({
      where: {blogId: id}
    });

    return null;
  }
}
