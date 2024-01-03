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
}
