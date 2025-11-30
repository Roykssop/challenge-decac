import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ProductModule } from './contexts/catalog/products/infrastructure/modules/Product.module';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ProductModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
