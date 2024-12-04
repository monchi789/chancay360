import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  lastName: string;

  @IsString()
  @MinLength(3)
  enterprise: string;

  @IsString()
  @MinLength(3)
  position: string;

  @IsEmail()
  @IsString()
  @MinLength(3)
  email: string;

  @IsBoolean()
  @IsOptional()
  authorized?: boolean;
}
