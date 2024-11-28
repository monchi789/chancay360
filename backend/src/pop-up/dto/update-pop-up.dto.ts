import { PartialType } from '@nestjs/swagger';
import { CreatePopUpDto } from './create-pop-up.dto';

export class UpdatePopUpDto extends PartialType(CreatePopUpDto) {}
