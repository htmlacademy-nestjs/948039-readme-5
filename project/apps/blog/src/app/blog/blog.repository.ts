import { BadRequestException, Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/core';
import { BlogEntity } from './blog.entity';
import { Blog, BlogStatus, BlogType } from '@project/libs/app/types';
import { PrismaClientService } from '@project/libs/blog/models';
import { BaseBlogContentService } from './base-blog/base-blog.service';
import { baseBlogEntityFactory } from './base-blog/base-blog.factory';
import { blogFilter, blogSort } from './utils';
import { BlogPostWithPaginationRdo } from './rdo/blogs.rdo';
import { BlogQuery } from './query/blog-query';
import { BlogItemRdo } from './rdo/blog-item.rdo';

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
    const newBlog = await this.client.blog.create({
      data
    });
    const baseBlogContentEntity = baseBlogEntityFactory(entity.type, {...entity.content, blogId: newBlog.id});
    const newContent = await this.baseBlogContentService.save(entity.type, baseBlogContentEntity);
    const blogEntity = new BlogEntity({
      ...newBlog,
      content: newContent,
      type: newBlog.type as BlogType,
      status: newBlog.status as BlogStatus
    })
    return blogEntity;
  }

  public async find(param: BlogQuery): Promise<BlogPostWithPaginationRdo> {
    const {type, page, pageSize, sort, direction, search} = param;
    const filter = blogFilter({type, search});
    const orderBy = blogSort({sort, direction});
    const skip = (page - 1) * pageSize;
    const totalItems = await this.client.blog.count({
      where: filter
    });
    const totalPages = Math.ceil(totalItems / pageSize);
    const blogs = await this.client.blog.findMany({
      include: {
        textBlog: true,
        quoteBlog: true,
        videoBlog: true,
        linkBlog: true,
        photoBlog: true,
        comments: true,
        likes: true,
      },
      where: filter,
      orderBy,
      skip,
      take: pageSize,
    });

    const blogWithExtraData: BlogItemRdo[] = blogs.map(blog => {
      const {videoBlog, photoBlog, quoteBlog, comments, likes, textBlog, linkBlog, ...entity} = blog;
      const MAP = {
        video: videoBlog,
        text: textBlog,
        link: linkBlog,
        quote: quoteBlog,
        photo: photoBlog
      } as const;

      const blogEntity = new BlogEntity({
        ...entity,
        content: MAP[blog.type],
        type: entity.type as BlogType,
        status: entity.status as BlogStatus
      });
      return { ...blogEntity.toPlainObject(), likes: likes.length ?? 0, comments: comments.length ?? 0 };
    })
    const data = {data: blogWithExtraData, pagination: {currentPage: page , itemsPerPage: pageSize, totalItems, totalPages }};
    return data;
  }

  public async findById(id: string): Promise<BlogEntity> {
    const blog = await this.client.blog.findUnique({
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

    const {videoBlog, photoBlog, quoteBlog, comments, likes, textBlog, linkBlog, ...entity} = blog;
    const MAP = {
      video: videoBlog,
      text: textBlog,
      link: linkBlog,
      quote: quoteBlog,
      photo: photoBlog
    } as const;

    const blogEntity = new BlogEntity({
      ...entity,
      content: MAP[blog.type],
      type: entity.type as BlogType,
      status: entity.status as BlogStatus
    });
    return blogEntity;
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

  public async repostById(userId: string, blog: BlogEntity): Promise<BlogEntity> {
    const existRepostedBlog = await this.client.blog.findFirst({
      where: {
        userId,
        repostId: blog.id
      }
    });
    if (existRepostedBlog) {
      throw new BadRequestException();
    }

    const {content, id: blogId, ...data } = blog.toPlainObject();
    const newBlog = await this.client.blog.create({
      data: {
      ...data,
      createdDate: new Date(),
      postedDate: new Date(),
      userId,
      repost: true,
      repostId: blogId,
      repostUserId: data.userId,
      }
    });
    const {id, ...contentData} = blog.content;
    const baseBlogContentEntity = baseBlogEntityFactory(blog.type, {...contentData, blogId: newBlog.id});
    const newContent = await this.baseBlogContentService.save(blog.type, baseBlogContentEntity);
    const repostBlogEntity = new BlogEntity({
      ...newBlog,
      content: newContent,
      type: newBlog.type as BlogType,
      status: newBlog.status as BlogStatus
    })
    return repostBlogEntity;
  }
}
