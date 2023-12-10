import { Injectable } from '@nestjs/common';
import {BaseMemoryRepository} from '@project/core';
import { VideoBlogEntity } from './video-blog.entity';

@Injectable()
export class VideoBlogRepository extends BaseMemoryRepository<VideoBlogEntity> {}
