import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePublicationDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(3)
  content: string;

  @IsString()
  @MinLength(3)
  author: string;

  @IsString()
  @MinLength(3)
  category: string;

  @IsOptional()
  file?: Express.Multer.File[];
}
