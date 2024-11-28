import { Injectable } from '@nestjs/common';
import { CreatePopUpDto } from './dto/create-pop-up.dto';
import { UpdatePopUpDto } from './dto/update-pop-up.dto';

@Injectable()
export class PopUpService {
  create(createPopUpDto: CreatePopUpDto) {
    return 'This action adds a new popUp';
  }

  findAll() {
    return `This action returns all popUp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} popUp`;
  }

  update(id: number, updatePopUpDto: UpdatePopUpDto) {
    return `This action updates a #${id} popUp`;
  }

  remove(id: number) {
    return `This action removes a #${id} popUp`;
  }
}
