import { IsDateString, IsEmail, IsNotEmpty, IsNumber, Min, IsOptional,IsString, IsUUID } from 'class-validator';

export class RegistroDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  cnpj: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDateString()
  dataRegistro: Date;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  valor: number;
}
