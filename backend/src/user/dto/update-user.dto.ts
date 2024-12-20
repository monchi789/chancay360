import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @Transform(({ value }) => value.trim())
  user: string;

  @IsString()
  @MinLength(2)
  @IsOptional()
  @Transform(({ value }) => value.trim())
  name: string;

  @IsString()
  @MinLength(2)
  @IsOptional()
  @Transform(({ value }) => value.trim())
  lastName?: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password?: string;

  @IsString()
  @IsEmail()
  @MinLength(6)
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  googleId?: string;
  
  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  @MinLength(4)
  @IsOptional()
  rol: string;
}
