import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ProductCreator } from '../../application/ProductCreator';
import { ProductPostBodyDto } from '../dtos/ProductPostBody.dto';
import { ProductPrimitives } from '../../domain/Product';
import { ProductoExistenteException } from '../../domain/exceptions/ProductoExistenteException.exception';
import { InvalidArgumentException } from 'src/contexts/catalog/shared/exceptions/InvalidArgument.exception';

@Controller('products')
export class ProductPostController {
  constructor(private readonly creator: ProductCreator) { }

  @Post()
  async run(
    @Body() productPostBodyDto: ProductPostBodyDto,
  ): Promise<ProductPrimitives> {
    try {
      const productoCreado = await this.creator.execute(productPostBodyDto);
      return productoCreado;
    } catch (error: unknown) {
      if (
        error instanceof ProductoExistenteException ||
        error instanceof InvalidArgumentException
      ) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException(error);
    }
  }
}
