import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mysql2 from 'mysql2/promise';

const MysqlProvider = {
  provide: 'MysqlProvider',
  useFactory: async (configService: ConfigService) => {
    const pool = mysql2.createPool({
      host: configService.get<string>('MYSQL_HOST'),
      user: configService.get<string>('MYSQL_USER'),
      password: configService.get<string>('MYSQL_PASSWORD'),
      database: configService.get<string>('MYSQL_DATABASE'),
    });

    try {
      const connection = await pool.getConnection();
      console.log(`Conexión exitosa a la BD`);
      connection.release();
    } catch (error) {
      console.error('Falló la conexión a la BD:', error);
      throw error;
    }

    return pool;
  },
  inject: [ConfigService],
};

@Module({
  providers: [MysqlProvider],
  exports: [MysqlProvider],
})
export class MysqlModule { }
