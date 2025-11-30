import { Module } from '@nestjs/common';
import { ProductPostController } from '../controllers/ProductPost.controller';
import { ProductGetByIdController } from '../controllers/ProductGetById.controller';
import { ProductCreator } from '../../application/ProductCreator';
import { ProductFinder } from '../../application/ProductFinder';
import { MysqlProductRepository } from '../persistence/MysqlProduct.repository';
import { MysqlModule } from 'src/contexts/catalog/shared/infrastructure/persistence/mysql/Mysql.module';

const ProductRepository = {
  provide: 'ProductRepository',
  useClass: MysqlProductRepository,
};

@Module({
  imports: [MysqlModule],
  providers: [ProductCreator, ProductFinder, ProductRepository],
  controllers: [ProductPostController, ProductGetByIdController],
})
export class ProductModule { }