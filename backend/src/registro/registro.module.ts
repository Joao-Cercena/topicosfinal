import { Module } from '@nestjs/common';
import { RegistroService } from './registro.service';
import { RegistroController } from './registro.controller';
import { RegistroEntity } from './registro.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RegistroEntity])],
  providers: [RegistroService],
  controllers: [RegistroController]
})
export class RegistroModule {}
