import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gallery } from './entities/gallery.entity';
import { Repository } from 'typeorm';
import { ServicesService } from 'src/services/services.service';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepository: Repository<Gallery>,
    private readonly servicesService: ServicesService,
  ) {}

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

  async findAll() {
    return this.galleryRepository.find({
      select: ['images', 'publicationDate', 'description'],
    });
  }

  async findOne(idGallery: number) {
    try {
      const gallery = await this.galleryRepository.findOne({
        where: { idGallery },
        select: ['images', 'publicationDate', 'description'],
      });

      if (!gallery) {
        throw new Error('Gallery not found');
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
    files: { images?: Express.Multer.File[] },
  ) {
    const gallery = await this.galleryRepository.findOne({
      where: { idGallery: idGallery },
    });

    if (!gallery) {
      throw new NotFoundException('Gallery not found');
    }

    let newImages: string[] = [];

    try {
      if (files?.images?.length) {
        newImages = await this.servicesService.uploadImage(
          files.images,
          'gallery/images',
        );
      }

      if (gallery.images.length) {
        await this.servicesService
          .deleteImages(gallery.images)
          .catch((error) => {
            console.error('Error deleting images', error);
          });
      }

      const updateData = {
        ...updateGalleryDto,
        ...(newImages.length && { images: newImages }),
      };

      await this.galleryRepository.update(idGallery, updateData);

      return await this.galleryRepository.findOne({ where: { idGallery } });
    } catch (error) {
      if (newImages.length) {
        await this.servicesService.deleteImages(newImages);
      }

      throw new BadRequestException(`Error updating gallery: ${error.message}`);
    }
  }

  async remove(idGallery: number) {
    const gallery = await this.galleryRepository.delete(idGallery);

    if (gallery.affected === 0) {
      throw new BadRequestException(`Gallery with ID ${idGallery} not found`);
    }

    return { message: `Gallery with ID ${idGallery} deleted` };
  }
}
