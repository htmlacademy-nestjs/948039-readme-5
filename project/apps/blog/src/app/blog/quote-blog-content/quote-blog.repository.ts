import { Injectable } from '@nestjs/common';
import {BaseMemoryRepository} from '@project/core';
import { QuoteBlogEntity } from './quote-blog.entity';

@Injectable()
export class QuoteBlogRepository extends BaseMemoryRepository<QuoteBlogEntity> {}
