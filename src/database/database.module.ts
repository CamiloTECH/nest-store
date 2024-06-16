import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../config';
const API_KEY = 'prueba apli key';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbName, host, password, port, user } = configService.postgres;
        return {
          host,
          port,
          password,
          username: user,
          type: 'postgres',
          synchronize: true,
          database: dbName,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [{ provide: 'API_KEY', useValue: API_KEY }],
  exports: ['API_KEY', TypeOrmModule],
})
export class DatabaseModule {}
