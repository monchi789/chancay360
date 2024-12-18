import {IsArray, IsOptional, IsString} from "class-validator";

export class UpdateGalleryDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  existingImages?: string[];
}