import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateGalleryDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  description?: string;
  
  @IsOptional()
  existingImages?: string[];
}
