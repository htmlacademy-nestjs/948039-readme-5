import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/core';
import { BlogEntity } from './blog.entity';
import { Blog, BlogStatus, BlogWithCommentsLikes } from '@project/libs/app/types';
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
    const detail = await this.baseBlogContentService.save(entity.type, baseBlogContentEntity);
    entity.id = record.id;
    entity.content = detail;
    return entity;
  }

  public async find(): Promise<BlogWithCommentsLikes[]> {
    const record = await this.client.blog.findMany({
      include: {
        textBlog: true,
        quoteBlog: true,
        videoBlog: true,
        linkBlog: true,
        photoBlog: true,
        comments: true,
        likes: true,
      },
    });

    const records = record.map(i => {
      const {videoBlog, photoBlog, quoteBlog, comments, likes, textBlog, linkBlog, ...entity} = i;
      const MAP = {
        video: videoBlog,
        text: textBlog,
        link: linkBlog,
        quote: quoteBlog,
        photo: photoBlog
      } as const;
      const newItem = {...entity, content: MAP[i.type], likes: likes.length ?? 0, comments: comments.length ?? 0 };
      return newItem;
    })

    return records as BlogWithCommentsLikes[];
  }

  public async findById(id: string): Promise<BlogEntity> {
    const record = await this.client.blog.findUnique({
      where: {id},
      include: {
        textBlog: true,
        quoteBlog: true,
        videoBlog: true,
        linkBlog: true,
        photoBlog: true,
        comments: true,
        likes: true,
      },
    });

    const {videoBlog, photoBlog, quoteBlog, comments, likes, textBlog, linkBlog, ...entity} = record;
    const MAP = {
      video: videoBlog,
      text: textBlog,
      link: linkBlog,
      quote: quoteBlog,
      photo: photoBlog
    } as const;

    const newItem = {...record, content: MAP[record.type] };
    const entitys = new BlogEntity(newItem as any);

    return entitys;
  }

  public async updateById(id: string, entity: BlogEntity, newBlogEntity: BlogEntity): Promise<BlogEntity> {
    const isChangeType = entity.type !== newBlogEntity.type;
    let updateBlogInfo: Record<string, unknown> = {
      type: newBlogEntity.type,
      tags: newBlogEntity.tags,
      status: newBlogEntity.status
    }

    if (entity.status === BlogStatus.Draft && newBlogEntity.status === BlogStatus.Public) {
      updateBlogInfo.postedDate = new Date();
    }
    const transactionResult = await this.client.$transaction(async (prisma) => {
      let blog;
      let content;
      const baseBlogContentEntity = baseBlogEntityFactory(newBlogEntity.type, {...newBlogEntity.content, blogId: id});
      blog = await prisma.blog.update({
        where: {id},
        data: updateBlogInfo
      })
      if (isChangeType) {
        await this.baseBlogContentService.deleteById(entity.type, id);
        content = await this.baseBlogContentService.save(newBlogEntity.type, baseBlogContentEntity);
      } else {
        content = await this.baseBlogContentService.update(newBlogEntity.type, id, baseBlogContentEntity);
      }
      blog.content = content
      return blog;
    })
    return transactionResult;
  }

  public async deleteById(id: string): Promise<null> {
    await this.client.blog.delete({
      where: {id},
    });

    return null;
  }
}
