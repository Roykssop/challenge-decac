import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../domain/Product.repository';
import { ProductId } from '../domain/ProductId';
import { ProductNoEncontradoException } from '../domain/exceptions/ProductNoEncontradoException.exception';

@Injectable()
export class ProductDeleter {
  constructor(
    @Inject('ProductRepository')
    private readonly repository: ProductRepository,
  ) { }

  async execute(id: number): Promise<void> {
    const productId = new ProductId(id);
    await this.ensureProductExists(productId);
    await this.repository.delete(productId);
  }

  private async ensureProductExists(id: ProductId): Promise<void> {
    const product = await this.repository.findById(id);
    if (!product) {
      throw new ProductNoEncontradoException(id.value);
    }
  }
}
