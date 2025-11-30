import {
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Put,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductDetailsUpdater } from '../../application/ProductDetailsUpdater';
import { ProductPutBodyDto } from '../dtos/ProductPutBody.dto';
import { ProductNoEncontradoException } from '../../domain/exceptions/ProductNoEncontradoException.exception';
import { InvalidArgumentException } from 'src/contexts/catalog/shared/exceptions/InvalidArgument.exception';
import { ProductoCamposNoProvistosException } from '../../domain/exceptions/ProductoCamposNoProvistosException';
import { ProductoNombreExistenteException } from '../../domain/exceptions/ProductoNombreExistenteException';

@ApiTags('productos')
@Controller('productos')
export class ProductPutController {
  constructor(private readonly updater: ProductDetailsUpdater) { }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Actualizar un producto existente' })
  @ApiResponse({ status: 204, description: '' })
  @ApiResponse({
    status: 400,
    description: 'Request no valido',
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
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
