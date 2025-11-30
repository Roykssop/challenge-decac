import {
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { ProductDetailsUpdater } from '../../application/ProductDetailsUpdater';
import { ProductPutBodyDto } from '../dtos/ProductPutBody.dto';
import { ProductNoEncontradoException } from '../../domain/exceptions/ProductNoEncontradoException.exception';
import { InvalidArgumentException } from 'src/contexts/catalog/shared/exceptions/InvalidArgument.exception';
import { ProductoCamposNoProvistosException } from '../../domain/exceptions/ProductoCamposNoProvistosException';
import { ProductoNombreExistenteException } from '../../domain/exceptions/ProductoNombreExistenteException';

@Controller('products')
export class ProductPutController {
  constructor(private readonly updater: ProductDetailsUpdater) { }

  @Put(':id')
  async run(
    @Param('id', ParseIntPipe) id: number,
    @Body() productPutBodyDto: ProductPutBodyDto,
  ): Promise<void> {
    try {
      await this.updater.execute(id, productPutBodyDto);
    } catch (error: unknown) {
      if (error instanceof ProductNoEncontradoException) {
        throw new NotFoundException(error.message);
      }
      if (
        error instanceof InvalidArgumentException ||
        error instanceof ProductoCamposNoProvistosException ||
        error instanceof ProductoNombreExistenteException
      ) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }
}
