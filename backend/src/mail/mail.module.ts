import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
