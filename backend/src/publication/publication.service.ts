import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { Publication } from './entities/publication.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServicesService } from 'src/services/services.service';
import {PaginationService} from "../shared/util/pagination.util";
import {PaginationDto} from "../shared/dto/pagination.dto";

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(Publication)
    private readonly publicationRepository: Repository<Publication>,
    private readonly servicesService: ServicesService,
  ) {}

  async create(
    createPublicationDto: CreatePublicationDto,
    files: {
      cover?: Express.Multer.File[];
      file?: Express.Multer.File[];
    },
  ) {
    let coverPaths: string[] = [];
    let filePaths: string[] = [];

    try {
      if (files.cover?.length) {
        coverPaths = await this.servicesService.uploadImage(
          files.cover,
          'publications/covers',
        );
      }

      if (files.file?.length) {
        filePaths = await this.servicesService.uploadPDF(
          files.file,
          'publications/files',
        );
      }

      const publicationData = {
        ...createPublicationDto,
        cover: coverPaths,
        file: filePaths,
      };

      const newPublication = this.publicationRepository.create(publicationData);
      return await this.publicationRepository.save(newPublication);
    } catch (error) {
      if (coverPaths.length) {
        await this.servicesService.deleteImages(coverPaths);
      }

      if (filePaths.length) {
        await this.servicesService.deleteImages(filePaths);
      }

      if (error instanceof BadRequestException) {
        throw new BadRequestException(
          `Error creating publication: ${error.message}`,
        );
      }
      throw error;
    }
  }

  async findAll(paginationDto?: PaginationDto) {
    const {page, limit} = paginationDto || {};
    return PaginationService.paginate(this.publicationRepository, {
      page,
      limit,
      select: {
        idPublication: true,
        author: true,
        title: true,
        content: true,
        cover: true,
        file: true,
        publicationDate: true,
        category: true
      }
    })
  }

  async findOne(idPublication: string) {
    try {
      const publication = await this.publicationRepository.findOne({
        where: { idPublication },
        select: [
          'idPublication',
          'author',
          'title',
          'content',
          'cover',
          'file',
          'publicationDate',
          'category',
        ],
      });

      if (!publication) {
        throw new Error('Publication not found');
      }

      return publication;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException('Publication not found');
      }
    }
  }

  async update(
    idPublication: string,
    updatePublicationDto: UpdatePublicationDto,
    files: {
      cover?: Express.Multer.File[];
      file?: Express.Multer.File[];
    },
  ) {
    const publication = await this.publicationRepository.findOne({
      where: { idPublication: idPublication },
    });

    if (!publication) {
      throw new NotFoundException('Publication not found');
    }

    let newCoverPaths: string[] = [];
    let newFilePaths: string[] = [];

    try {
      if (files?.cover?.length) {
        newCoverPaths = await this.servicesService.uploadImage(
          files.cover,
          'publications/covers',
        );
      }

      if (publication.cover.length) {
        await this.servicesService
          .deleteImages(publication.cover)
          .catch((error) => {
            console.error('Error deleting cover images', error);
          });
      }

      if (files?.file?.length) {
        newFilePaths = await this.servicesService.uploadPDF(
          files.file,
          'publications/files',
        );
      }

      if (publication.file.length) {
        await this.servicesService
          .deleteFiles(publication.file)
          .catch((error) => {
            console.error('Error deleting files', error);
          });
      }

      const updateData = {
        ...updatePublicationDto,
        ...(newCoverPaths.length && { cover: newCoverPaths }),
        ...(newFilePaths.length && { file: newFilePaths }),
      };

      await this.publicationRepository.update(idPublication, updateData);

      return await this.publicationRepository.findOne({
        where: { idPublication: idPublication },
      });
    } catch (error) {
      if (newCoverPaths.length) {
        await this.servicesService.deleteFiles(newCoverPaths).catch(() => {});
      }
      if (newFilePaths.length) {
        await this.servicesService.deleteFiles(newFilePaths).catch(() => {});
      }

      throw new BadRequestException(
        `Error updating publication: ${error.message}`,
      );
    }
  }

  async remove(idPublication: string) {
    const publication = await this.publicationRepository.delete(idPublication);

    if (publication.affected === 0) {
      throw new BadRequestException(
        `Publication with ID ${idPublication} not found`,
      );
    }

    return { message: `Publication with ID ${idPublication} deleted` };
  }
}
