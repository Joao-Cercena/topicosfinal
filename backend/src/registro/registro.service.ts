import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { Repository } from 'typeorm';
  import { RegistroEntity } from './registro.entity';
  import { InjectRepository } from '@nestjs/typeorm';
  import { RegistroDto } from './registro.dto';
  
  @Injectable()
  export class RegistroService {
    constructor(
      @InjectRepository(RegistroEntity)
      private registroRepository: Repository<RegistroEntity>,
    ) {}
 

    async findAll(page: number = 1, limit: number = 10): Promise<RegistroEntity[]> {
      const [result, total] = await this.registroRepository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
      });
      return result;
    }
  
    async findById(id: string): Promise<RegistroEntity> {
      const findOne = await this.registroRepository.findOne({
        where: { id },
      });
      if (!findOne) {
        throw new NotFoundException('Registro não encontrado com o id ' + id);
      }
      return findOne;
    }

    async search(query: any): Promise<RegistroEntity[]> {
      const qb = this.registroRepository.createQueryBuilder('registro');
      if (query.nome) {
        qb.andWhere('registro.nome LIKE :nome', { nome: `%${query.nome}%` });
      }
      if (query.cnpj) {
        qb.andWhere('registro.cnpj = :cnpj', { cnpj: query.cnpj });
      }

      if (query.email) {
        qb.andWhere('registro.email = :email', { email: query.email });
      }
      
      return qb.getMany();
    }
  
    async remove(id: string) {
      const findById = await this.findById(id);
      await this.registroRepository.remove(findById);
      return { ...findById, id };
    }
  
    async create(dto: RegistroDto) {
      const newRegistro = this.registroRepository.create(dto);
  
      await this.validateRegistro(newRegistro);
  
      return this.registroRepository.save(newRegistro);
    }
  
    async update(registro: RegistroDto) {
      await this.findById(registro.id);
  
      return this.registroRepository.save(registro);
    }
  
    private async  validateRegistro(registro: RegistroEntity | RegistroDto) {
      // await this.validateRegistroCNPJ(registro.cnpj);
      // await this.validateRegistroNome(registro.nome);
      // await this.validateRegistroEmail(registro.email);
    }
  

    // private async validateRegistroNome(nome: string) {
    //   const existingRegistro = await  this.registroRepository.findOne({ where: { nome } });
    //   if (existingRegistro) {
    //     throw new BadRequestException('Uma Registor com esse nome já existe.');
    //   }
    // }

    
    // private async validateRegistroCNPJ(cnpj: string){
  
    //   if (cnpj.length < 14) {
    //     throw new BadRequestException('O CNPJ deve ter 14 caracteres!');
    //   }

    //   const existingRegistro = await this.registroRepository.findOne({ where: { cnpj } });
    //   if (existingRegistro) {
    //     throw new BadRequestException('Uma Registro com esse CNPJ já existe.');
    //   }
    // }
    
    
    // private async validateRegistroEmail(email: string) {
    //   const existingRegistro =  await this.registroRepository.findOne({ where: { email } });
    //   if (existingRegistro) {
    //     throw new BadRequestException('Um cadastro com esse e-mail já existe.');
    //   }
    // }
    
    
}