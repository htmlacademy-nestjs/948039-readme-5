import { Injectable } from '@nestjs/common';
import {BaseMemoryRepository} from '@project/core';
import { LinkBlogEntity } from './link-blog.entity';

@Injectable()
export class LinkBlogRepository extends BaseMemoryRepository<LinkBlogEntity> {}
