import { ProductPostBodyDto } from '../infrastructure/dtos/ProductPostBody.dto';
import { ProductCreatedAt } from './ProductCreatedAt';
import { ProductDescripcion } from './ProductDescripcion';
import { ProductId } from './ProductId';
import { ProductNombre } from './ProductNombre';
import { ProductPrecio } from './ProductPrecio';
import { ProductUpdatedAt } from './ProductUpdatedAt';

export type ProductPrimitives = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  createdAt: string;
  updatedAt: string;
};

export class Product {
  constructor(
    private readonly id: ProductId,
    private nombre: ProductNombre,
    private descripcion: ProductDescripcion,
    private precio: ProductPrecio,
    private createdAt: ProductCreatedAt,
    private updatedAt: ProductUpdatedAt,
  ) { }

  static create(productPostBodyDto: ProductPostBodyDto): Product {
    return new Product(
      new ProductId(0),
      new ProductNombre(productPostBodyDto.nombre),
      new ProductDescripcion(productPostBodyDto.descripcion),
      new ProductPrecio(productPostBodyDto.precio),
      new ProductCreatedAt(new Date()),
      new ProductUpdatedAt(new Date()),
    );
  }

  static fromPrimitives(primitives: ProductPrimitives): Product {
    return new Product(
      new ProductId(Number(primitives.id)),
      new ProductNombre(primitives.nombre),
      new ProductDescripcion(primitives.descripcion),
      new ProductPrecio(Number(primitives.precio)),
      new ProductCreatedAt(new Date(primitives.createdAt)),
      new ProductUpdatedAt(new Date(primitives.updatedAt)),
    );
  }

  toPrimitives(): ProductPrimitives {
    return {
      id: Number(this.id.value),
      nombre: this.nombre.value,
      descripcion: this.descripcion.value,
      precio: this.precio.value,
      createdAt: this.createdAt.value.toISOString(),
      updatedAt: this.updatedAt.value.toISOString(),
    };
  }
}
