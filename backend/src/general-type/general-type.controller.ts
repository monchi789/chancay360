import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GeneralTypeService } from './general-type.service';
import { CreateGeneralTypeDto } from './dto/create-general-type.dto';
import { UpdateGeneralTypeDto } from './dto/update-general-type.dto';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { Auth } from '../auth/decorators/auth.decorators';
import { Rol } from '../shared/enums/rol.enum';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';

@Controller('general-type')
export class GeneralTypeController {
  constructor(private readonly generalTypeService: GeneralTypeService) {}

  @Post()
  @Auth(Rol.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createGeneralTypeDto: CreateGeneralTypeDto) {
    return this.generalTypeService.create(createGeneralTypeDto);
  }

  @Get()
  @Auth(Rol.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.generalTypeService.findAll(paginationDto);
  }

  @Get('publication')
  @Auth(Rol.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  findAllPublication() {
    return this.generalTypeService.findAllPublication();
  }

  @Get('role')
  @Auth(Rol.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  findAllRole() {
    return this.generalTypeService.findAllRole();
  }

  @Get(':id')
  @Auth(Rol.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param('id') id: string) {
    return this.generalTypeService.findOne(id);
  }

  @Patch(':id')
  @Auth(Rol.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  update(
    @Param('id') id: string,
    @Body() updateGeneralTypeDto: UpdateGeneralTypeDto,
  ) {
    return this.generalTypeService.update(id, updateGeneralTypeDto);
  }

  @Delete(':id')
  @Auth(Rol.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.generalTypeService.remove(id);
  }
}
