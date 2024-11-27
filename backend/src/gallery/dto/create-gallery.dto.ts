import { IsString, MinLength } from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  @MinLength(3)
  description: string;
}
