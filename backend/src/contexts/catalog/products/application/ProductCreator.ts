import { Injectable, Inject } from '@nestjs/common';
import { Product, ProductPrimitives } from '../domain/Product';
import { ProductPostBodyDto } from '../infrastructure/dtos/ProductPostBody.dto';
import { ProductRepository } from '../domain/Product.repository';
import { ProductNombre } from '../domain/ProductNombre';
import { ProductoExistenteException } from '../domain/exceptions/ProductoExistenteException.exception';

@Injectable()
export class ProductCreator {
  constructor(
    @Inject('ProductRepository')
    private readonly repository: ProductRepository,
  ) { }

  async execute(
    productPostBodyDto: ProductPostBodyDto,
  ): Promise<ProductPrimitives> {
    await this.ensureProductoNoExiste(productPostBodyDto.nombre);

    const producto = Product.create(productPostBodyDto);

    const productGuardado = await this.repository.save(producto);
    return productGuardado.toPrimitives();
  }

  private async ensureProductoNoExiste(nombreProducto: string) {
    const nombre = new ProductNombre(nombreProducto);
    const exists = await this.repository.existsByNombre(nombre);
    if (exists) {
      throw new ProductoExistenteException(nombre.value);
    }
  }
}
