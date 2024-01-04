import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/core';
import { TextBlogEntity } from './text-blog.entity';
import { TextBlogContent } from '@project/libs/app/types';
import { PrismaClientService } from '@project/libs/blog/models';
@Injectable()
export class TextBlogRepository extends BasePostgresRepository<TextBlogEntity, TextBlogContent> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, TextBlogEntity.fromObject);
  }

  public async save(entity: TextBlogEntity): Promise<TextBlogEntity> {
    const record = await this.client.textBlog.create({
      data: { ...entity.toPlainObject() }
    });

    entity.id = record.id;
    return entity;
  }

  public async update(id: string, entity: TextBlogEntity): Promise<TextBlogEntity> {
    const record = await this.client.textBlog.update({
      where: {blogId: id},
      data: entity.toPlainObject()
    });
    const content = new TextBlogEntity(record);
    return content;
  }

  public async deleteById(id: string): Promise<null> {
    await this.client.textBlog.delete({
      where: {blogId: id}
    });

    return null;
  }
}
