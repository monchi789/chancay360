import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'cover', maxCount: 5 },
      { name: 'file', maxCount: 5 },
    ]),
  )
  create(
    @Body() createPublicationDto: CreatePublicationDto,
    @UploadedFiles()
    files: {
      cover?: Express.Multer.File[];
      file?: Express.Multer.File[];
    },
  ) {
    console.log(createPublicationDto, files);
    return this.publicationService.create(createPublicationDto, files);
  }

  @Get()
  findAll() {
    return this.publicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicationService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'cover', maxCount: 5 },
      { name: 'file', maxCount: 5 },
    ]),
  )
  update(
    @Param('id') id: string,
    @Body() updatePublicationDto: UpdatePublicationDto,
    @UploadedFile()
    files: {
      cover?: Express.Multer.File[];
      file?: Express.Multer.File[];
    },
  ) {
    return this.publicationService.update(id, updatePublicationDto, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicationService.remove(id);
  }
}
