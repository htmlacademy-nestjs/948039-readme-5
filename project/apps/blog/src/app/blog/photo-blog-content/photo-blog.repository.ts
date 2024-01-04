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

  public async update(id: string, entity: PhotoBlogEntity): Promise<PhotoBlogEntity> {
    const record = await this.client.photoBlog.update({
      where: {blogId: id},
      data: entity.toPlainObject()
    });
    const content = new PhotoBlogEntity(record);
    return content;
  }

  public async deleteById(id: string): Promise<null> {
    await this.client.photoBlog.delete({
      where: {blogId: id}
    });

    return null;
  }
}
