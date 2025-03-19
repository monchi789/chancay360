import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdatePublicationDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsOptional()
  cover: Express.Multer.File[];

  @IsOptional()
  files: Express.Multer.File[];

  @IsString()
  @IsOptional()
  category: string;

  @IsDate()
  @IsOptional()
  publicationDate: Date;

  @IsBoolean()
  @IsOptional()
  published: boolean;
}
