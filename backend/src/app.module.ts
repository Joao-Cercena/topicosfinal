import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OngsModule } from './ongs/ongs.module';
import { DoadorModule } from './doador/doador.module';
import { OngsEntity } from './ongs/ongs.entity';
import { DoadorEntity } from './doador/doador.entity';
import { RegistroModule } from './registro/registro.module';
import { RegistroEntity } from './registro/registro.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST', 'localhost'),
        port: configService.get<number>('DATABASE_PORT', 5432),
        username: configService.get<string>('DATABASE_USERNAME', 'postgres'),
        password: configService.get<string>('DATABASE_PASSWORD', 'admin'),
        database: configService.get<string>('DATABASE_NAME', 'postgres'),
        entities: [OngsEntity, DoadorEntity, RegistroEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    OngsModule,
    DoadorModule,
    RegistroModule,
  ],
})
export class AppModule {}
