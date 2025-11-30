import { ApiProperty } from '@nestjs/swagger';
import { ProductPrimitives } from '../../domain/Product';

export class ProductWithDolarDto implements ProductPrimitives {
  @ApiProperty({ example: 1, description: 'El ID único del producto' })
  id: number;

  @ApiProperty({ example: 'Producto 1', description: 'El nombre del producto' })
  nombre: string;

  @ApiProperty({
    example: 'Descripción del producto',
    description: 'La descripción del producto',
  })
  descripcion: string;

  @ApiProperty({ example: 100.5, description: 'El precio en moneda local' })
  precio: number;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Fecha de creación',
  })
  createdAt: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Fecha de última actualización',
  })
  updatedAt: string;

  @ApiProperty({ example: 50.25, description: 'El precio aproximado en USD' })
  precio_usd: number;
}
