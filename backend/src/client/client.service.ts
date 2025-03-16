import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    try {
      const newClient = this.clientRepository.create(createClientDto);
      return await this.clientRepository.save(newClient);
    } catch {
      throw new InternalServerErrorException('Error to create Client');
    }
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Client>> {
    try {
      return await paginate(query, this.clientRepository, {
        sortableColumns: ['name', 'lastName'],
        nullSort: 'last',
        defaultSortBy: [['createAt', 'ASC']],
        searchableColumns: [
          'name',
          'lastName',
          'email',
          'enterprise',
          'authorization',
        ],
        select: [
          'id',
          'name',
          'lastName',
          'email',
          'phone',
          'enterprise',
          'position',
          'authorization',
        ],
        filterableColumns: { authorization: [FilterOperator.EQ] },
      });
    } catch {
      throw new InternalServerErrorException('Error to get all Client');
    }
  }

  async findOne(id: string) {
    try {
      const client = await this.clientRepository.findOne({
        where: { id },
        select: [
          'id',
          'name',
          'lastName',
          'email',
          'phone',
          'enterprise',
          'position',
          'authorization',
        ],
      });

      if (!client) {
        throw new Error(`Error to get Client with id ${id}`);
      }

      return client;
    } catch {
      throw new InternalServerErrorException(
        `Error to get Client with id ${id}`,
      );
    }
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.clientRepository.findOne({ where: { id } });

    if (!client) {
      throw new Error(`Client with id ${id} not found`);
    }

    try {
      await this.clientRepository.update(id, updateClientDto);
      return this.clientRepository.findOne({ where: { id } });
    } catch {
      throw new InternalServerErrorException(
        `Error to update client with id ${id}`,
      );
    }
  }

  async remove(id: string) {
    const client = await this.clientRepository.findOne({ where: { id } });

    if (!client) {
      throw new Error(`Client with id ${id} not found`);
    }

    try {
      await this.clientRepository.delete(id);
      return { message: `Client with id ${id} was deleted` };
    } catch {
      throw new InternalServerErrorException(
        `Error to delete client with id  ${id}`,
      );
    }
  }
}
