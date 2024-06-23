import { DoadorEntity } from 'src/doador/doador.entity';
import { OngsEntity } from 'src/ongs/ongs.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'registro' })
export class RegistroEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  descricao: string;

  @Column({ type: 'timestamp', name: 'data_registro', nullable: true })
  dataRegistro: Date;

  @Column({ type: 'decimal', name: 'valor', nullable: false })
  valor: number;


  @ManyToMany(() => OngsEntity)
  @JoinColumn() 
  ongs: OngsEntity;


  @Column({ })
  ongsId: string;

  @ManyToMany(() => DoadorEntity)
  @JoinColumn() 
  doador: DoadorEntity;


  @Column({ })
  doadorId: string;
}
