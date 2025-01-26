import { IsArray, IsOptional, IsString } from 'class-validator';
export class UpdatePopUpDto {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];
}
