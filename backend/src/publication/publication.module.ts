import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';

@Module({
  controllers: [PublicationController],
  providers: [PublicationService],
})
export class PublicationModule {}
