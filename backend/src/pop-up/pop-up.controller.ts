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
import { PopUpService } from './pop-up.service';
import { CreatePopUpDto } from './dto/create-pop-up.dto';
import { UpdatePopUpDto } from './dto/update-pop-up.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('pop-up')
export class PopUpController {
  constructor(private readonly popUpService: PopUpService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('image', 1))
  create(
    @Body() createPopUpDto: CreatePopUpDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.popUpService.create(createPopUpDto, files);
  }

  @Get()
  findAll() {
    return this.popUpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.popUpService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('image', 1))
  update(
    @Param('id') id: string,
    @Body() updatePopUpDto: UpdatePopUpDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.popUpService.update(+id, updatePopUpDto, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.popUpService.remove(+id);
  }
}
