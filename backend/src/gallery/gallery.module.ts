import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gallery } from './entities/gallery.entity';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [TypeOrmModule.forFeature([Gallery]), ServicesModule],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
