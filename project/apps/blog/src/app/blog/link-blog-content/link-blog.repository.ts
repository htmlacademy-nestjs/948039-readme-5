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

  public async update(id: string, entity: LinkBlogEntity): Promise<LinkBlogEntity> {
    const record = await this.client.linkBlog.update({
      where: {blogId: id},
      data: entity.toPlainObject()
    });
    const content = new LinkBlogEntity(record);
    return content;
  }

  public async deleteById(id: string): Promise<null> {
    await this.client.linkBlog.delete({
      where: {blogId: id}
    });

    return null;
  }
}
