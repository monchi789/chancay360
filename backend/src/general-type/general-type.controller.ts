import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GeneralTypeService } from './general-type.service';
import { CreateGeneralTypeDto } from './dto/create-general-type.dto';
import { UpdateGeneralTypeDto } from './dto/update-general-type.dto';
import { PaginationDto } from '../shared/dto/pagination.dto';

@Controller('general-type')
export class GeneralTypeController {
  constructor(private readonly generalTypeService: GeneralTypeService) {}

  @Post()
  create(@Body() createGeneralTypeDto: CreateGeneralTypeDto) {
    return this.generalTypeService.create(createGeneralTypeDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.generalTypeService.findAll(paginationDto);
  }

  @Get('publication')
  findAllPublication() {
    return this.generalTypeService.findAllPublication();
  }

  @Get('role')
  findAllRole() {
    return this.generalTypeService.findAllRole();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generalTypeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGeneralTypeDto: UpdateGeneralTypeDto,
  ) {
    return this.generalTypeService.update(id, updateGeneralTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generalTypeService.remove(id);
  }
}
