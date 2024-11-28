import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { ServicesModule } from 'src/services/services.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publication } from './entities/publication.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Publication]), ServicesModule],
  controllers: [PublicationController],
  providers: [PublicationService],
})
export class PublicationModule {}
