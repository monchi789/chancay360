import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGeneralTypeDto } from './dto/create-general-type.dto';
import { UpdateGeneralTypeDto } from './dto/update-general-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GeneralType } from './entities/general-type.entity';
import { Repository } from 'typeorm';
import { Type } from 'src/shared/enums/type.enum';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { PaginationService } from '../shared/util/pagination.util';

@Injectable()
export class GeneralTypeService {
  constructor(
    @InjectRepository(GeneralType)
    private readonly generalTypeRepository: Repository<GeneralType>,
  ) {}

  async create(createGeneralTypeDto: CreateGeneralTypeDto) {
    try {
      if (!Object.values(Type).includes(createGeneralTypeDto.type as Type)) {
        throw new BadRequestException('Invalid type');
      }

      const GeneralTypeExist = await this.generalTypeRepository.findOne({
        where: { code: createGeneralTypeDto.code },
      });

      if (GeneralTypeExist) {
        throw new BadRequestException('GeneralType already exists');
      }

      const newGeneralType =
        this.generalTypeRepository.create(createGeneralTypeDto);

      return await this.generalTypeRepository.save(newGeneralType);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(
          `Error creating generalType: ${error.message}`,
        );
      }
    }
  }

  async findAll(paginationDto?: PaginationDto) {
    const { page, limit } = paginationDto || {};
    return PaginationService.paginate(this.generalTypeRepository, {
      page,
      limit,
      select: {
        idGeneralType: true,
        code: true,
        description: true,
        type: true,
        name: true,
        active: true,
      },
    });
  }

  async findOne(idGeneralType: string) {
    try {
      const generalType = await this.generalTypeRepository.findOne({
        where: { idGeneralType },
        select: [
          'idGeneralType',
          'code',
          'description',
          'type',
          'name',
          'active',
        ],
      });

      if (!generalType) {
        throw new Error('GeneralType not found');
      }

      return generalType;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException('GeneralType not found');
      }
    }
  }

  async update(
    idGeneralType: string,
    updateGeneralTypeDto: UpdateGeneralTypeDto,
  ) {
    if (updateGeneralTypeDto.type) {
      if (!Object.values(Type).includes(updateGeneralTypeDto.type as Type)) {
        throw new BadRequestException('Invalid type');
      }
    }

    const generalType = this.generalTypeRepository.update(
      idGeneralType,
      updateGeneralTypeDto,
    );

    if ((await generalType).affected === 0) {
      throw new BadRequestException(
        `GeneralType with ID ${idGeneralType} not found`,
      );
    }

    return this.generalTypeRepository.findOne({ where: { idGeneralType } });
  }

  async remove(idGeneralType: string) {
    const generalType = await this.generalTypeRepository.delete(idGeneralType);

    if (generalType.affected === 0) {
      throw new BadRequestException(
        `GeneralType with ID ${idGeneralType} not found`,
      );
    }
  }

  async findAllPublication() {
    return await this.generalTypeRepository.find({
      where: { type: Type.PUBLICATION },
    });
  }

  async findAllRole() {
    return await this.generalTypeRepository.find({
      where: { type: Type.ROLE },
    });
  }
}
