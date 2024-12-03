import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const newClient = this.clientRepository.create(createClientDto);
    return await this.clientRepository.save(newClient);
  }

  async findAll() {
    return await this.clientRepository.find({
      select: [
        'idClient',
        'name',
        'lastName',
        'enterprise',
        'position',
        'email',
        'authorized',
      ],
    });
  }

  async findOne(idClient: string) {
    try {
      const client = await this.clientRepository.findOne({
        where: { idClient },
        select: [
          'idClient',
          'name',
          'lastName',
          'enterprise',
          'position',
          'email',
          'authorized',
        ],
      });

      if (!client) {
        throw new Error('Client not found');
      }

      return client;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException('Client not found');
      }
    }
  }

  async update(idClient: string, updateClientDto: UpdateClientDto) {
    const client = this.clientRepository.update(idClient, updateClientDto);

    if ((await client).affected === 0) {
      throw new BadRequestException(`Client with ID ${idClient} not found`);
    }

    return this.clientRepository.findOne({ where: { idClient } });
  }

  async remove(idClient: string) {
    const client = await this.clientRepository.delete(idClient);

    if (client.affected === 0) {
      throw new BadRequestException(`Client with ID ${idClient} not found`);
    }

    return { message: `Client with ID ${idClient} deleted` };
  }
}
