import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { Auth } from '../auth/decorators/auth.decorators';
import { Rol } from '../shared/enums/rol.enum';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @Auth(Rol.ADMIN, Rol.GESTOR_CLIENTES)
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  @Auth(Rol.ADMIN, Rol.GESTOR_CLIENTES)
  @UseGuards(AuthGuard, RolesGuard)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.clientService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth(Rol.ADMIN, Rol.GESTOR_CLIENTES)
  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @Patch(':id')
  @Auth(Rol.ADMIN, Rol.GESTOR_CLIENTES)
  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  @Auth(Rol.ADMIN, Rol.GESTOR_CLIENTES)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }
}
