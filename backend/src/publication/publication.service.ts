import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Publication } from './entities/publication.entity';
import { Repository } from 'typeorm';
import { ServicesService } from 'src/services/services.service';
import { paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(Publication)
    private readonly publicationRepository: Repository<Publication>,
    private readonly serviceService: ServicesService,
  ) {}

  async create(
    createPublicationDto: CreatePublicationDto,
    files: { cover?: Express.Multer.File[]; files?: Express.Multer.File[] },
  ) {
    let coverPaths: string[] = [];
    let filePaths: string[] = [];

    try {
      if (files.cover?.length) {
        coverPaths = await this.serviceService.uploadImages(
          files.cover,
          'publications/covers',
        );
      }

      if (files.files?.length) {
        filePaths = await this.serviceService.uploadPDF(
          files.files,
          'publications/files',
        );
      }

      const publicationData = {
        ...createPublicationDto,
        cover: coverPaths,
        files: filePaths,
      };

      const newPublication = this.publicationRepository.create(publicationData);

      return await this.publicationRepository.save(newPublication);
    } catch {
      throw new InternalServerErrorException('Error to create a publication');
    }
  }

  async findAll(query: PaginateQuery) {
    try {
      return await paginate(query, this.publicationRepository, {
        sortableColumns: ['title', 'publicationDate'],
        nullSort: 'last',
        defaultSortBy: [['createAt', 'ASC']],
        searchableColumns: [
          'title',
          'published',
          'category',
          'publicationDate',
        ],
        select: [
          'id',
          'title',
          'content',
          'cover',
          'files',
          'category',
          'publicationDate',
        ],
      });
    } catch {
      throw new InternalServerErrorException('Error to get all publication');
    }
  }

  async findOne(id: string) {
    try {
      const publication = await this.publicationRepository.findOne({
        where: { id },
        select: [
          'id',
          'title',
          'content',
          'cover',
          'files',
          'category',
          'publicationDate',
        ],
      });

      if (!publication) {
        throw new NotFoundException(`Error to get Publication with id ${id}`);
      }

      return publication;
    } catch {
      throw new InternalServerErrorException(
        `Error to get Publication with id ${id}`,
      );
    }
  }

  async update(
    id: string,
    updatePublicationDto: UpdatePublicationDto,
    files: {
      cover?: Express.Multer.File[];
      files?: Express.Multer.File[];
    },
  ) {
    const publication = await this.publicationRepository.findOne({
      where: { id },
    });

    if (!publication) {
      throw new NotFoundException(`Error to get publication with id ${id}`);
    }

    let newCoverPaths: string[] = [];
    let newFilesPaths: string[] = [];

    try {
      if (files?.cover?.length) {
        newCoverPaths = await this.serviceService.uploadImages(
          files.cover,
          'publications/covers',
        );
      }

      if (publication.cover.length) {
        await this.serviceService.deleteImages(publication.cover).catch(() => {
          throw new InternalServerErrorException('Error to delete images');
        });
      }

      if (files?.files?.length) {
        newFilesPaths = await this.serviceService.uploadPDF(
          files.files,
          'publications/files',
        );
      }

      if (publication.files.length) {
        await this.serviceService.deleteFiles(publication.files).catch(() => {
          throw new InternalServerErrorException('Error to delete files');
        });
      }

      const updateData = {
        ...updatePublicationDto,
        cover: newCoverPaths.length ? newCoverPaths : publication.cover,
        files: newFilesPaths.length ? newFilesPaths : publication.files,
      };

      await this.publicationRepository.update(id, updateData);
    } catch {
      if (newCoverPaths.length) {
        await this.serviceService.deleteFiles(newCoverPaths).catch(() => {});
      }
      if (newFilesPaths.length) {
        await this.serviceService.deleteFiles(newFilesPaths).catch(() => {});
      }

      throw new InternalServerErrorException('Error to update publication');
    }
  }

  async remove(id: string) {
    const publication = await this.publicationRepository.findOne({
      where: { id },
    });

    if (!publication) {
      throw new NotFoundException(`Error to get publication with id ${id}`);
    }

    await this.publicationRepository.delete(id);

    return { message: `Publication with id ${id} was deleted sucessfully` };
  }
}
