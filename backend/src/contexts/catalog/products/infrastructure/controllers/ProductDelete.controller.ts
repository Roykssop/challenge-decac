import {
  Controller,
  Delete,
  Param,
  NotFoundException,
  InternalServerErrorException,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductDeleter } from '../../application/ProductDeleter';
import { ProductNoEncontradoException } from '../../domain/exceptions/ProductNoEncontradoException.exception';
import { InvalidArgumentException } from 'src/contexts/catalog/shared/exceptions/InvalidArgument.exception';
import { ParseIntPipeCustomMsg } from 'src/contexts/catalog/shared/infrastructure/pipes/ParseIntPipeCustomMsg.pipe';

@ApiTags('productos')
@Controller('productos')
export class ProductDeleteController {
  constructor(private readonly productDeleter: ProductDeleter) { }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un producto por ID' })
  @ApiResponse({ status: 204, description: '' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async run(@Param('id', ParseIntPipeCustomMsg) id: number): Promise<void> {
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
