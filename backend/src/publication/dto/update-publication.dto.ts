import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdatePublicationDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  author: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  content: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  category: string;
}
