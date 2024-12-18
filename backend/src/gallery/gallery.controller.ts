import {
  BadRequestException,
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
import {FileFieldsInterceptor, FilesInterceptor} from '@nestjs/platform-express';
import {PaginationDto} from '../shared/dto/pagination.dto';
import {Auth} from "../auth/decorators/auth.decorators";
import {Rol} from "../shared/enums/rol.enum";
import {AuthGuard} from "../auth/guard/auth.guard";
import {RolesGuard} from "../auth/guard/roles.guard";

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 20))
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
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'images', maxCount: 20}
  ]))
  async update(
    @Param('id') id: string,
    @Body() body: { data: string },
    @UploadedFiles() files: { images?: Express.Multer.File[] }
  ) {
    try {
      const updateGalleryDto: UpdateGalleryDto = JSON.parse(body.data);

      if (!updateGalleryDto) {
        throw new BadRequestException('Invalid gallery data');
      }

      return await this.galleryService.update(+id, updateGalleryDto, files);
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new BadRequestException('Invalid JSON format in gallery data');
      }
      throw error;
    }
  }

  @Delete(':id')
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.galleryService.remove(+id);
  }
}
