import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { getRabbitMQOptions } from '@project/libs/helpers';
import { NotifyService } from './notify.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('rabbit')
    )
  ],
  providers: [NotifyService],
  exports: [NotifyService]
})
export class NotifyModule {}
