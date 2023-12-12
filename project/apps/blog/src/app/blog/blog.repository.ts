import { Injectable } from '@nestjs/common';
import {BaseMemoryRepository} from '@project/core';
import { BlogEntity } from './blog.entity';

@Injectable()
export class BlogRepository extends BaseMemoryRepository<BlogEntity> {}
