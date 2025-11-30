import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProductFinder } from '../../application/ProductFinder';
import { ProductPrimitives } from '../../domain/Product';
import { ProductNoEncontradoException } from '../../domain/exceptions/ProductNoEncontradoException.exception';

@Controller('products')
export class ProductGetByIdController {
  constructor(private readonly productFinder: ProductFinder) { }

  @Get(':id')
  async run(@Param('id', ParseIntPipe) id: number): Promise<ProductPrimitives> {
    try {
      return await this.productFinder.execute(id);
    } catch (error: unknown) {
      if (error instanceof ProductNoEncontradoException) {
        throw new NotFoundException(error.message);
      }

      throw new InternalServerErrorException(error);
    }
  }
}
