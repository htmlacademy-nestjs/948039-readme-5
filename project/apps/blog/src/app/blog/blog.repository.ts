import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/core';
import { BlogEntity } from './blog.entity';
import { Blog } from '@project/libs/app/types';
import { PrismaClientService } from '@project/libs/blog/models';
import { BaseBlogContentService } from './base-blog/base-blog.service';
import { baseBlogEntityFactory } from './base-blog/base-blog.factory';

@Injectable()
export class BlogRepository extends BasePostgresRepository<BlogEntity, Blog> {
  constructor(
    protected readonly client: PrismaClientService,
    private readonly baseBlogContentService: BaseBlogContentService
  ) {
    super(client, BlogEntity.fromObject);
  }

  public async save(entity: BlogEntity): Promise<BlogEntity> {
    const {content, ... data } = entity.toPlainObject();
    const record = await this.client.blog.create({
      data
    });
    const baseBlogContentEntity = baseBlogEntityFactory(entity.type, {...entity.content, blogId: record.id});
    const detail = await this.baseBlogContentService.save(entity.type, baseBlogContentEntity)
    entity.id = record.id;
    entity.content = detail;
    return entity;
  }
}
