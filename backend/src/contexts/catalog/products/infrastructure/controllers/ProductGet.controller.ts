import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductWithDolarDto } from '../dtos/ProductWithDolarResponse.dto';
import { ProductsFinder } from '../../application/ProductsFinder';

@ApiTags('products')
@Controller('products')
export class ProductGetController {
  constructor(private readonly productsFinder: ProductsFinder) { }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos con su precio en USD' })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos obtenida exitosamente',
    type: [ProductWithDolarDto],
  })
  async run(): Promise<ProductWithDolarDto[]> {
    try {
      return await this.productsFinder.execute();
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }
}
