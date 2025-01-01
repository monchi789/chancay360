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
  Query,
  UseGuards,
} from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { Auth } from '../auth/decorators/auth.decorators';
import { Rol } from '../shared/enums/rol.enum';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';

@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post()
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @UseGuards(AuthGuard, RolesGuard)
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
  findAll(@Query() paginationDto: PaginationDto) {
    return this.publicationService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicationService.findOne(id);
  }

  @Patch(':id')
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'cover', maxCount: 5 },
      { name: 'file', maxCount: 5 },
    ]),
  )
  update(
    @Param('id') id: string,
    @Body() updatePublicationDto: UpdatePublicationDto,
    @UploadedFiles()
    files: {
      cover?: Express.Multer.File[];
      file?: Express.Multer.File[];
    },
  ) {
    return this.publicationService.update(id, updatePublicationDto, files);
  }

  @Delete(':id')
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.publicationService.remove(id);
  }
}
