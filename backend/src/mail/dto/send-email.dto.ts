import {IsEmail, IsNotEmpty, IsString, MaxLength} from "class-validator";

export class SendEmailDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;
  
  @IsString()
  @IsNotEmpty()
  lastName: string;
  
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  phoneNumber: string;
  
  @IsString()
  @IsNotEmpty()
  message: string;
}