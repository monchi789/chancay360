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
import { PopUpService } from './pop-up.service';
import { CreatePopUpDto } from './dto/create-pop-up.dto';
import { UpdatePopUpDto } from './dto/update-pop-up.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { Auth } from '../auth/decorators/auth.decorators';
import { Rol } from '../shared/enums/rol.enum';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';

@Controller('pop-up')
export class PopUpController {
  constructor(private readonly popUpService: PopUpService) {}

  @Post()
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FilesInterceptor('image', 1))
  create(
    @Body() createPopUpDto: CreatePopUpDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.popUpService.create(createPopUpDto, files);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.popUpService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.popUpService.findOne(+id);
  }

  @Patch(':id')
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FilesInterceptor('image', 1))
  update(
    @Param('id') id: string,
    @Body() updatePopUpDto: UpdatePopUpDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.popUpService.update(+id, updatePopUpDto, files);
  }

  @Delete(':id')
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.popUpService.remove(+id);
  }
}
