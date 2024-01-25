import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { RabbitRouting } from '@project/libs/app/types';
import { MailService } from '../mail/mail.service';
import { SendNewBLogsDto } from './dto/send-dew-blogs.dto';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notify.income',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'readme.notify.subscribe',
  })
  public async create(subscriber: CreateSubscriberDto) {

    this.subscriberService.addSubscriber(subscriber);
    this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: 'readme.notify.income',
    routingKey: RabbitRouting.SendNewBlogs,
    queue: 'readme.notify.sendNewPost',
  })
  public async sendNewBlogs(blogs: SendNewBLogsDto) {
    const subscribers = await this.subscriberService.findSubscribers();
    this.mailService.sendNotifyForNewBlogs(subscribers, blogs.blogs);
  }
}
