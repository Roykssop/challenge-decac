import { Injectable, Inject } from '@nestjs/common';
import { Product, ProductPrimitives } from '../domain/Product';
import { ProductRepository } from '../domain/Product.repository';
import { ProductWithDolarDto } from '../infrastructure/dtos/ProductWithDolarResponse.dto';
import { ProductUsdPriceConverter } from './ProductUsdPriceConverter';

@Injectable()
export class ProductsFinder {
  constructor(
    @Inject('ProductRepository')
    private readonly repository: ProductRepository,
    private readonly productUsdPriceConverter: ProductUsdPriceConverter,
  ) { }

  async execute(): Promise<ProductWithDolarDto[]> {
    const productos = await this.repository.findAll();
    return productos.map((producto) =>
      this.formatearProductoConDolar(producto),
    );
  }

  private formatearProductoConDolar(product: Product): ProductWithDolarDto {
    const productPrimitives: ProductPrimitives = product.toPrimitives();
    return {
      ...productPrimitives,
      precio_usd: this.productUsdPriceConverter.execute(
        productPrimitives.precio,
      ),
    };
  }
}
