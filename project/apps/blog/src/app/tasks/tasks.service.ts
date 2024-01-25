import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BlogRepository } from '../blog/blog.repository';
import dayjs from 'dayjs';
import { NotifyService } from '../notify/notify.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    private readonly blogRepository: BlogRepository,
    private readonly notifyService: NotifyService,

  ) {

  }

  @Cron('* * 12 * * *')
  async handleCron() {
    const dateRange = dayjs().add(-1, 'day').toDate();
    const blogs = await this.blogRepository.findNew(dateRange);
    this.notifyService.sendNewBlogsForSubscripbers({blogs})
  }
}
