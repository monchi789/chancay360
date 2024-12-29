import { IsOptional, IsString, MinLength, IsArray } from 'class-validator';

export class UpdatePublicationDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  title: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  author: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  content: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  category: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true }) 
  existingCover?: string[]; 

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  existingFile?: string[]; 
}
