import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {CreateGalleryDto} from './dto/create-gallery.dto';
import {UpdateGalleryDto} from './dto/update-gallery.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Gallery} from './entities/gallery.entity';
import {Repository} from 'typeorm';
import {ServicesService} from 'src/services/services.service';
import {PaginationDto} from '../shared/dto/pagination.dto';
import {PaginationService} from '../shared/util/pagination.util';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepository: Repository<Gallery>,
    private readonly servicesService: ServicesService,
  ) {
  }

  async create(
    createGalleryDto: CreateGalleryDto,
    images: Express.Multer.File[],
  ) {
    let imagesPaths: string[] = [];

    try {
      if (images?.length) {
        imagesPaths = await this.servicesService.uploadImage(
          images,
          'gallery/images',
        );
      }

      const galleryData = {
        ...createGalleryDto,
        images: imagesPaths,
      };

      const newGallery = this.galleryRepository.create(galleryData);

      return await this.galleryRepository.save(newGallery);
    } catch (error) {
      if (imagesPaths.length) {
        await this.servicesService.deleteImages(imagesPaths);
      }

      if (error instanceof BadRequestException) {
        throw new BadRequestException(
          `Error creating gallery: ${error.message}`,
        );
      }
    }
  }

  async findAll(paginationDto?: PaginationDto) {
    const {page, limit} = paginationDto || {};
    return PaginationService.paginate(this.galleryRepository, {
      page,
      limit,
      select: {
        idGallery: true,
        images: true,
        publicationDate: true,
        description: true,
      },
    });
  }

  async findOne(idGallery: number) {
    try {
      const gallery = await this.galleryRepository.findOne({
        where: {idGallery},
        select: ['idGallery', 'images', 'publicationDate', 'description'],
        order: {
          idGallery: 'DESC'
        }
      });

      if (!gallery) {
        new Error('Gallery not found');
      }

      return gallery;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException('Gallery not found');
      }
    }
  }

  async update(
    idGallery: number,
    updateGalleryDto: UpdateGalleryDto,
    files: { images?: Express.Multer.File[] }
  ) {
    const gallery = await this.galleryRepository.findOne({
      where: {idGallery},
    });

    if (!gallery) {
      throw new NotFoundException('Gallery not found');
    }

    let newImages: string[] = [];
    const existingImages = updateGalleryDto.existingImages || [];

    try {
      // 1. Subir nuevas imágenes
      if (files?.images?.length) {
        newImages = await this.servicesService.uploadImage(
          files.images,
          'gallery/images',
        );
      }

      const imagesToDelete = gallery.images.filter(
        img => !existingImages.includes(img) && !existingImages.includes(`/${img}`)
      );

      if (imagesToDelete.length > 0) {
        await Promise.all(
          imagesToDelete.map(async (img) => {
            try {
              await this.servicesService.deleteImages([img]);
            } catch (error) {
              console.warn(`Warning: Could not delete image ${img}`, error);
            }
          })
        );
      }

      const finalImages = [
        ...existingImages,
        ...newImages
      ];

      await this.galleryRepository.update(
        {idGallery},
        {
          description: updateGalleryDto.description,
          images: finalImages,
        }
      );

      return await this.galleryRepository.findOne({
        where: {idGallery},
      });
    } catch (error) {
      if (newImages.length > 0) {
        await Promise.all(
          newImages.map(img =>
            this.servicesService.deleteImages([img])
              .catch(err => console.error(`Error cleaning up image ${img}:`, err))
          )
        );
      }

      throw new BadRequestException(
        `Error updating gallery: ${error.message}`
      );
    }
  }

  async remove(idGallery: number) {
    const gallery = await this.galleryRepository.delete(idGallery);

    if (gallery.affected === 0) {
      throw new BadRequestException(`Gallery with ID ${idGallery} not found`);
    }

    return {message: `Gallery with ID ${idGallery} deleted`};
  }
}
