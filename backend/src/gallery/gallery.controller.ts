import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', 5))
  create(
    @Body() createGalleryDto: CreateGalleryDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.galleryService.create(createGalleryDto, files);
  }

  @Get()
  findAll() {
    return this.galleryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galleryService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images', 5))
  update(
    @Param('id') id: string,
    @Body() updateGalleryDto: UpdateGalleryDto,
    @UploadedFiles() files: { images?: Express.Multer.File[] },
  ) {
    return this.galleryService.update(+id, updateGalleryDto, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galleryService.remove(+id);
  }
}
