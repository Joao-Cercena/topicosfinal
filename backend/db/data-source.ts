import { DataSource, DataSourceOptions } from 'typeorm';
import { OngsEntity } from 'src/ongs/ongs.entity';
import { DoadorEntity } from 'src/doador/doador.entity';
import { RegistroEntity } from 'src/registro/registro.entity';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    database: 'postgres',
    username: 'postgres',
    password: 'admin',
    port: 5432,
    entities: [OngsEntity, DoadorEntity, RegistroEntity],
    migrations: ['dist/db/migration/*.js'],
}

export default new DataSource(dataSourceOptions);
