import {
  Controller,
  Get,
  Param,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProductFinder } from '../../application/ProductFinder';
import { ProductNoEncontradoException } from '../../domain/exceptions/ProductNoEncontradoException.exception';
import { ProductWithDolarDto } from '../dtos/ProductWithDolarResponse.dto';
import { InvalidArgumentException } from 'src/contexts/catalog/shared/exceptions/InvalidArgument.exception';
import { ParseIntPipeCustomMsg } from 'src/contexts/catalog/shared/infrastructure/pipes/ParseIntPipeCustomMsg.pipe';

@Controller('products')
export class ProductGetByIdController {
  constructor(private readonly productFinder: ProductFinder) { }

  @Get(':id')
  async run(
    @Param('id', ParseIntPipeCustomMsg) id: number,
  ): Promise<ProductWithDolarDto> {
    try {
      return await this.productFinder.execute(id);
    } catch (error: unknown) {
      if (
        error instanceof ProductNoEncontradoException ||
        error instanceof InvalidArgumentException
      ) {
        throw new NotFoundException(error.message);
      }

      throw new InternalServerErrorException(error);
    }
  }
}
