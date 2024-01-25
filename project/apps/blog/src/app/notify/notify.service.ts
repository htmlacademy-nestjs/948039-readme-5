import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { ConfigType } from '@nestjs/config';
import { SendNewBLogsDto } from './dto/send-new-blogs';
import { RabbitRouting } from '@project/libs/app/types';
import { rabbitConfig } from '@project/libs/config/blog';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async sendNewBlogsForSubscripbers(dto: SendNewBLogsDto) {
    return this.rabbitClient.publish<SendNewBLogsDto>(
      this.rabbiOptions.exchange,
      RabbitRouting.SendNewBlogs,
      { ...dto }
    );
  }
}
