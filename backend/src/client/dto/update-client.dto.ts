import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  lastName: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  enterprise: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  position: string;

  @IsBoolean()
  @IsOptional()
  authorization: boolean;
}
