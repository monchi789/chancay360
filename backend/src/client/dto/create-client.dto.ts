import { IsBoolean, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  lastName: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  enterprise: string;

  @IsString()
  position: string;

  @IsBoolean()
  authorization: boolean;
}
