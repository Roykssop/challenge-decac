import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ProductWithDolarDto } from '../dtos/ProductWithDolarResponse.dto';
import { ProductsFinder } from '../../application/ProductsFinder';

@Controller('products')
export class ProductGetController {
  constructor(private readonly productsFinder: ProductsFinder) { }

  @Get()
  async run(): Promise<ProductWithDolarDto[]> {
    try {
      return await this.productsFinder.execute();
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }
}
