import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength, Min } from 'class-validator';

export class ProductPostBodyDto {
  @ApiProperty({
    description: 'El nombre del producto',
    example: 'Producto 1',
    maxLength: 255,
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MaxLength(255, { message: 'El nombre no debe superar los 255 caracteres' })
  nombre: string;

  @ApiProperty({
    description: 'La descripción del producto',
    example: 'Descripción del producto 1',
  })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  descripcion: string;

  @ApiProperty({
    description: 'El precio del producto',
    example: 100.5,
    minimum: 0,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio debe ser un número con dos decimales' },
  )
  @Min(0, { message: 'El precio no puede ser negativo' })
  precio: number;
}
