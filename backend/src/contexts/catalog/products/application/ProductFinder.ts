import { Injectable, Inject } from '@nestjs/common';
import { Product, ProductPrimitives } from '../domain/Product';
import { ProductRepository } from '../domain/Product.repository';
import { ProductId } from '../domain/ProductId';
import { ProductNoEncontradoException } from '../domain/exceptions/ProductNoEncontradoException.exception';
import { ProductWithDolarDto } from '../infrastructure/dtos/ProductWithDolarResponse.dto';
import { ProductUsdPriceConverter } from './ProductUsdPriceConverter';

@Injectable()
export class ProductFinder {
  constructor(
    @Inject('ProductRepository')
    private readonly repository: ProductRepository,
    private readonly productUsdPriceConverter: ProductUsdPriceConverter,
  ) { }

  async execute(id: number): Promise<ProductWithDolarDto> {
    const producto = await this.ensureExisteProducto(id);
    const productoDolar = this.formatearProductoConDolar(producto);
    return productoDolar;
  }

  private async ensureExisteProducto(idProducto: number): Promise<Product> {
    const id = new ProductId(idProducto);
    const producto = await this.repository.findById(id);
    if (!producto) {
      throw new ProductNoEncontradoException(idProducto);
    }

    return producto;
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
