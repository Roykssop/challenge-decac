import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  NotFoundException,
  InternalServerErrorException,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { ProductDeleter } from '../../application/ProductDeleter';
import { ProductNoEncontradoException } from '../../domain/exceptions/ProductNoEncontradoException.exception';
import { InvalidArgumentException } from 'src/contexts/catalog/shared/exceptions/InvalidArgument.exception';

@Controller('products')
export class ProductDeleteController {
  constructor(private readonly productDeleter: ProductDeleter) { }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async run(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.productDeleter.execute(id);
    } catch (error: unknown) {
      if (error instanceof ProductNoEncontradoException) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof InvalidArgumentException) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException(error);
    }
  }
}
