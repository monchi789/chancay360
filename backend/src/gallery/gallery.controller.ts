import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {GalleryService} from './gallery.service';
import {CreateGalleryDto} from './dto/create-gallery.dto';
import {UpdateGalleryDto} from './dto/update-gallery.dto';
import {FilesInterceptor} from '@nestjs/platform-express';
import {PaginationDto} from '../shared/dto/pagination.dto';
import {Auth} from "../auth/decorators/auth.decorators";
import {Rol} from "../shared/enums/rol.enum";
import {AuthGuard} from "../auth/guard/auth.guard";
import {RolesGuard} from "../auth/guard/roles.guard";

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', 5))
  @Auth(Rol.CREADOR_CONTENIDO, Rol.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  create(
    @Body() createGalleryDto: CreateGalleryDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.galleryService.create(createGalleryDto, files);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.galleryService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galleryService.findOne(+id);
  }

  @Patch(':id')
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FilesInterceptor('images', 5))
  update(
    @Param('id') id: string,
    @Body() updateGalleryDto: UpdateGalleryDto,
    @UploadedFiles() files: { images?: Express.Multer.File[] },
  ) {
    return this.galleryService.update(+id, updateGalleryDto, files);
  }

  @Delete(':id')
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.galleryService.remove(+id);
  }
}
