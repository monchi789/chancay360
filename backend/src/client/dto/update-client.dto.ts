import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateClientDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  lastName: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  enterprise: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  position: string;

  @IsOptional()
  @IsEmail()
  @IsString()
  @MinLength(3)
  email: string;

  @IsBoolean()
  @IsOptional()
  authorized?: boolean;
}
