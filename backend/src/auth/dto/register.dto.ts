import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  user: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  name: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  lastName: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(8)
  password: string;

  @IsEmail()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @Transform(({ value }) => value.trim())
  email: string;
}
