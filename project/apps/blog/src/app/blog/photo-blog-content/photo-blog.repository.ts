import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/core';
import { PhotoBlogContent } from '@project/libs/app/types';
import { PrismaClientService } from '@project/libs/blog/models';
import { PhotoBlogEntity } from './photo-blog.entity';
@Injectable()
export class PhotoBlogRepository extends BasePostgresRepository<PhotoBlogEntity, PhotoBlogContent> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, PhotoBlogEntity.fromObject);
  }

  public async save(entity: PhotoBlogEntity): Promise<PhotoBlogEntity> {
    const record = await this.client.photoBlog.create({
      data: { ...entity.toPlainObject() }
    });

    entity.id = record.id;
    return entity;
  }
}
