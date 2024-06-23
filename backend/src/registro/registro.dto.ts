
import {
    IsDateString,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
  } from 'class-validator';
  
  export class RegistroDto {
    @IsUUID()
    @IsOptional()
    id: string;
  }
  