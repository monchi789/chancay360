import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePopUpDto } from './dto/create-pop-up.dto';
import { UpdatePopUpDto } from './dto/update-pop-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PopUp } from './entities/pop-up.entity';
import { Repository } from 'typeorm';
import { ServicesService } from 'src/services/services.service';
import {PaginationDto} from "../shared/dto/pagination.dto";
import {PaginationService} from "../shared/util/pagination.util";

@Injectable()
export class PopUpService {
  constructor(
    @InjectRepository(PopUp)
    private readonly popUpRepository: Repository<PopUp>,
    private readonly servicesService: ServicesService,
  ) {}

  async create(createPopUpDto: CreatePopUpDto, image: Express.Multer.File[]) {
    let imagePath: string[] = [];

    try {
      if (image?.length) {
        imagePath = await this.servicesService.uploadImage(
          image,
          'pop-up/images',
        );
      }

      const popUpData = {
        ...createPopUpDto,
        images: imagePath,
      };

      const newPopUp = this.popUpRepository.create(popUpData);

      return await this.popUpRepository.save(newPopUp);
    } catch (error) {
      if (imagePath.length) {
        await this.servicesService.deleteImages(imagePath);
      }

      if (error instanceof BadRequestException) {
        throw new BadRequestException(`Error creating popUp: ${error.message}`);
      }
    }
  }

  async findAll(paginationDto?: PaginationDto) {
    const {page, limit} = paginationDto || {};
    
    return PaginationService.paginate(this.popUpRepository, {
      page,
      limit,
      select: {
        idPopUp: true,
        images: true,
      },
    });
  }

  async findOne(idPopUp: number) {
    try {
      const popUp = await this.popUpRepository.findOne({
        where: { idPopUp },
        select: ['idPopUp', 'images'],
      });

      if (!popUp) {
        throw new Error('Pop up not found');
      }

      return popUp;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException('Pop Up not found');
      }
    }
  }

  async update(
    idPopUp: number,
    updatePopUpDto: UpdatePopUpDto,
    image: Express.Multer.File[],
  ) {
    const popUp = await this.popUpRepository.findOne({
      where: { idPopUp },
    });

    if (popUp) {
      throw new NotFoundException('Pop Up not found');
    }

    let newImage: string[] = [];

    try {
      if (image?.length) {
        newImage = await this.servicesService.uploadImage(
          image,
          'pop-up/images',
        );
      }

      if (popUp.images.length) {
        await this.servicesService.deleteImages(popUp.images).catch((error) => {
          console.log('Error deleting image', error);
        });
      }

      const updateData = {
        ...updatePopUpDto,
        ...(newImage.length && { images: newImage }),
      };

      await this.popUpRepository.update(idPopUp, updateData);

      return await this.popUpRepository.findOne({ where: { idPopUp } });
    } catch (error) {
      if (newImage.length) {
        await this.servicesService.deleteImages(newImage);
      }

      throw new BadRequestException(`Error updating pop up: ${error.message}`);
    }
  }

  async remove(idPopUp: number) {
    const popUp = await this.popUpRepository.delete(idPopUp);

    if (popUp.affected === 0) {
      throw new BadRequestException(`Pop Up with ID ${idPopUp} not found`);
    }

    return { message: `Pop Up with ID ${idPopUp} deleted` };
  }
}
