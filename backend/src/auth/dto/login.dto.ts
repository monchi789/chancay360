import { IsEmail, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @IsEmail()
  @IsString()
  @Transform(({ value }) => value.trim())
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  password: string;
}
