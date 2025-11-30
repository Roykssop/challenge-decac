import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../domain/Product.repository';
import { ProductPutBodyDto } from '../infrastructure/dtos/ProductPutBody.dto';
import { ProductId } from '../domain/ProductId';
import { ProductNoEncontradoException } from '../domain/exceptions/ProductNoEncontradoException.exception';
import { Product } from '../domain/Product';
import { ProductNombre } from '../domain/ProductNombre';
import { ProductDescripcion } from '../domain/ProductDescripcion';
import { ProductPrecio } from '../domain/ProductPrecio';
import { ProductoCamposNoProvistosException } from '../domain/exceptions/ProductoCamposNoProvistosException';
import { ProductoNombreExistenteException } from '../domain/exceptions/ProductoNombreExistenteException';

@Injectable()
export class ProductDetailsUpdater {
  constructor(
    @Inject('ProductRepository') private readonly repository: ProductRepository,
  ) { }

  async execute(id: number, productPutByDto: ProductPutBodyDto): Promise<void> {
    this.ensureDatosProvistos(productPutByDto);
    const producto = await this.ensureExisteProducto(id);

    await this.updateCamposDeProducto(producto, productPutByDto);

    await this.repository.update(producto);
  }

  private ensureDatosProvistos(fields: ProductPutBodyDto) {
    if (
      fields.nombre === undefined &&
      fields.descripcion === undefined &&
      fields.precio === undefined
    ) {
      throw new ProductoCamposNoProvistosException();
    }
  }

  private async updateCamposDeProducto(
    product: Product,
    fields: ProductPutBodyDto,
  ): Promise<void> {
    if (fields.nombre !== undefined) {
      const nombre = new ProductNombre(fields.nombre);
      if (await this.repository.existsByNombre(nombre)) {
        throw new ProductoNombreExistenteException(fields.nombre);
      }
      product.cambiarNombre(new ProductNombre(fields.nombre));
    }
    if (fields.descripcion !== undefined) {
      product.cambiarDescripcion(new ProductDescripcion(fields.descripcion));
    }
    if (fields.precio !== undefined) {
      product.cambiarPrecio(new ProductPrecio(fields.precio));
    }
  }

  private async ensureExisteProducto(idProducto: number): Promise<Product> {
    const id = new ProductId(idProducto);
    const producto = await this.repository.findById(id);
    if (!producto) {
      throw new ProductNoEncontradoException(idProducto);
    }

    return producto;
  }
}
