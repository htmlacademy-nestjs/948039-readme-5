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
}
