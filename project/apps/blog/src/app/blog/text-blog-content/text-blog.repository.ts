import { Injectable } from '@nestjs/common';
import {BaseMemoryRepository} from '@project/core';
import { TextBlogEntity } from './text-blog.entity';

@Injectable()
export class TextBlogRepository extends BaseMemoryRepository<TextBlogEntity> {}
