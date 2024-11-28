import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  description?: string;
}
