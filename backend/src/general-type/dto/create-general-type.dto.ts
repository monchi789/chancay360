import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateGeneralTypeDto {
  @IsString()
  @MinLength(3)
  code: string;

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @MinLength(3)
  type: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
