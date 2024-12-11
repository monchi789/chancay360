import { IsEmail, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdatePasswordDto {
  @Transform(({ value }) => value.trim())
  @Transform(({ value }) => value.toLowerCase())
  @IsEmail()
  @IsString()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(8)
  password: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(8)
  newPassword: string;
}
