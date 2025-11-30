import {
  Controller,
  Get,
  Param,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductFinder } from '../../application/ProductFinder';
import { ProductNoEncontradoException } from '../../domain/exceptions/ProductNoEncontradoException.exception';
import { ProductWithDolarDto } from '../dtos/ProductWithDolarResponse.dto';
import { InvalidArgumentException } from 'src/contexts/catalog/shared/exceptions/InvalidArgument.exception';
import { ParseIntPipeCustomMsg } from 'src/contexts/catalog/shared/infrastructure/pipes/ParseIntPipeCustomMsg.pipe';

@ApiTags('products')
@Controller('products')
export class ProductGetByIdController {
  constructor(private readonly productFinder: ProductFinder) { }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID con su precio en USD' })
  @ApiResponse({
    status: 200,
    description: 'Producto encontrado exitosamente',
    type: ProductWithDolarDto,
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
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
