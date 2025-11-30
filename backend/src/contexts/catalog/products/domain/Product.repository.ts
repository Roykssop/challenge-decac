import { Nullable } from '../../shared/domain/Nullable';
import { Product } from './Product';
import { ProductId } from './ProductId';
import { ProductNombre } from './ProductNombre';

export interface ProductRepository {
  save(product: Product): Promise<Product>;
  findById(id: ProductId): Promise<Nullable<Product>>;
  existsByNombre(nombre: ProductNombre): Promise<boolean>;
}
