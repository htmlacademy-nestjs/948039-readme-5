import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/core';
import { QuoteBlogContent } from '@project/libs/app/types';
import { PrismaClientService } from '@project/libs/blog/models';
import { QuoteBlogEntity } from './quote-blog.entity';
@Injectable()
export class QuoteBlogRepository extends BasePostgresRepository<QuoteBlogEntity, QuoteBlogContent> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, QuoteBlogEntity.fromObject);
  }

  public async save(entity: QuoteBlogEntity): Promise<QuoteBlogEntity> {
    const record = await this.client.quoteBlog.create({
      data: { ...entity.toPlainObject() }
    });

    entity.id = record.id;
    return entity;
  }

  public async update(id: string, entity: QuoteBlogEntity): Promise<QuoteBlogEntity> {
    const record = await this.client.quoteBlog.update({
      where: {blogId: id},
      data: entity.toPlainObject()
    });
    const content = new QuoteBlogEntity(record);
    return content;
  }

  public async deleteById(id: string): Promise<null> {
    await this.client.quoteBlog.delete({
      where: {blogId: id}
    });

    return null;
  }
}
