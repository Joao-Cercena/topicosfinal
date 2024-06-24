import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoadorEntity } from './doador.entity';

@Injectable()
export class DoadorService {
  constructor(
    @InjectRepository(DoadorEntity)
    private readonly doadorRepository: Repository<DoadorEntity>,
  ) {}



  async findAll(page: number = 1, limit: number = 10): Promise<DoadorEntity[]> {
    const [result, total] = await this.doadorRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });
    return result;
  }

  async search(query: any): Promise<DoadorEntity[]> {
    const qb = this.doadorRepository.createQueryBuilder('doador');
    if (query.nome) {
      qb.andWhere('doador.nome LIKE :nome', { nome: `%${query.nome}%` });
    }
    if (query.cnpj) {
      qb.andWhere('doador.cpf = :cpf', { cpf: query.cpf });
    }

    if (query.email) {
      qb.andWhere('doador.email LIKE :email', { email: query.email });
    }
    
    return qb.getMany();
  }

  async findOne(id: string): Promise<DoadorEntity> {
    const doador = await this.doadorRepository.findOne({ where: { id } });
    if (!doador) {
      throw new NotFoundException('Doador não encontrado');
    }
    return doador;
  }

  async create(doadorData: DoadorEntity): Promise<DoadorEntity> {
    console.log("entrou no back service");
    await this.validateDoadorData(doadorData);
    const newDoador = this.doadorRepository.create(doadorData);
    return this.doadorRepository.save(newDoador);
  }

  async update(id: string, doadorData: DoadorEntity): Promise<DoadorEntity> {
    await this.doadorRepository.update(id, doadorData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.doadorRepository.delete(id);
  }

  // Métodos de Validação
  private async validateDoadorData(doadorData: DoadorEntity, id?: string): Promise<void> {
    await this.validateAge(doadorData);
    await this.validateUniqueEmail(doadorData.email, id);
    this.validateCPF(doadorData.cpf);
  }

  private async validateAge(doadorData: DoadorEntity): Promise<void> {
    const age = this.calculateAge(doadorData.dataNascimento);
    if (age < 18) {
      throw new BadRequestException('O doador deve ter pelo menos 18 anos.');
    }
  }

  private calculateAge(birthdate: Date): number {
    const ageDifMs = Date.now() - new Date(birthdate).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  private async validateUniqueEmail(email: string, id?: string): Promise<void> {
    const doador = await this.doadorRepository.findOne({ where: { email } });
    if (doador && doador.id !== id) {
      throw new BadRequestException('O email já está em uso.');
    }
  }


  private validateCPF(cpf: string): void {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]/g, '');

    if (cpf.length !== 11) {
      throw new BadRequestException('O CPF deve ter exatamente 11 dígitos.');
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) {
      throw new BadRequestException('O CPF é inválido.');
    }

    // Validação dos dígitos verificadores
    let sum;
    let remainder;

    sum = 0;
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(9, 10))) {
      throw new BadRequestException('O CPF é inválido.');
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(10, 11))) {
      throw new BadRequestException('O CPF é inválido.');
    }
  }

}
