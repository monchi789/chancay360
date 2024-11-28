import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateGeneralTypeDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  code: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  description: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  type: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
