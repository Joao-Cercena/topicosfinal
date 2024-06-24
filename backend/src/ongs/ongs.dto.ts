
import {
    IsDateString,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    Length,
  } from 'class-validator';
  
  export class OngsDto {
    @IsUUID()
    @IsOptional()
    id: string;
  
    @IsString({ message: 'O campo nome deve ser do tipo texto' })
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    nome: string;
  
    @IsString({ message: 'O campo CNPJ deve ser do tipo texto' })
    @IsNotEmpty({ message: 'O CNPJ não pode ser vazio' })
    @Length(14, 14, { message: 'O CNPJ deve ter exatamente 14 caracteres' })
    cnpj: string;

    @IsEmail({}, { message: 'O campo email deve ser um endereço de email válido' })
    @IsNotEmpty({ message: 'O campo email não pode ser vazio' })
    email: string;

    setorId: string;
  }
  