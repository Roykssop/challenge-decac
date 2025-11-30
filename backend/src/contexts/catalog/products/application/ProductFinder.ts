import { Injectable, Inject } from '@nestjs/common';
import { ProductPrimitives } from '../domain/Product';
import { ProductRepository } from '../domain/Product.repository';
import { ProductId } from '../domain/ProductId';
import { ProductNoEncontradoException } from '../domain/exceptions/ProductNoEncontradoException.exception';

@Injectable()
export class ProductFinder {
  constructor(
    @Inject('ProductRepository')
    private readonly repository: ProductRepository,
  ) { }

  async execute(id: number): Promise<ProductPrimitives> {
    const producto = await this.ensureExisteProducto(id);

    return producto.toPrimitives();
  }

  private async ensureExisteProducto(idProducto: number) {
    const id = new ProductId(idProducto);
    const producto = await this.repository.findById(id);
    if (!producto) {
      throw new ProductNoEncontradoException(idProducto);
    }

    return producto;
  }
}
