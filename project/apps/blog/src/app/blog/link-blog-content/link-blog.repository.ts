import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/core';
import { LinkBlogContent } from '@project/libs/app/types';
import { PrismaClientService } from '@project/libs/blog/models';
import { LinkBlogEntity } from './link-blog.entity';
@Injectable()
export class LinkBlogRepository extends BasePostgresRepository<LinkBlogEntity, LinkBlogContent> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, LinkBlogEntity.fromObject);
  }

  public async save(entity: LinkBlogEntity): Promise<LinkBlogEntity> {
    const record = await this.client.linkBlog.create({
      data: { ...entity.toPlainObject() }
    });

    entity.id = record.id;
    return entity;
  }
}
