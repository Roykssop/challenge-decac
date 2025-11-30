import { Module } from '@nestjs/common';
import { ProductPostController } from '../controllers/ProductPost.controller';
import { ProductCreator } from '../../application/ProductCreator';
import { MysqlProductRepository } from '../persistence/MysqlProduct.repository';
import { MysqlModule } from 'src/contexts/catalog/shared/infrastructure/persistence/mysql/Mysql.module';

const ProductRepository = {
  provide: 'ProductRepository',
  useClass: MysqlProductRepository,
};

@Module({
  imports: [MysqlModule],
  providers: [ProductCreator, ProductRepository],
  controllers: [ProductPostController],
})
export class ProductModule { }
