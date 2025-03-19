import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreatePublicationDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  cover: Express.Multer.File[];

  @IsOptional()
  files: Express.Multer.File[];

  @IsString()
  category: string;

  @IsDate()
  publicationDate: Date;

  @IsBoolean()
  published: boolean;
}
