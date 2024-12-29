import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  user?: string;

  @IsString()
  @MinLength(2)
  @Transform(({ value }) => value.trim())
  name: string;

  @IsString()
  @MinLength(2)
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  lastName?: string;

  @IsString()
  @Transform(({ value }) => value?.trim())
  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsString()
  @IsEmail()
  @MinLength(6)
  email: string;

  @IsString()
  @MinLength(4)
  @IsOptional()
  rol?: string;

  @IsString()
  @IsOptional()
  googleId?: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}