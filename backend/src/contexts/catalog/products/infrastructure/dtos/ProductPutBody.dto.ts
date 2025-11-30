import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class ProductPutBodyDto {
  @ApiPropertyOptional({
    description: 'El nombre del producto',
    example: 'Producto Modificado',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MaxLength(255, { message: 'El nombre no debe superar los 255 caracteres' })
  nombre?: string;

  @ApiPropertyOptional({
    description: 'La descripción del producto',
    example: 'Descripción modificada',
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  descripcion?: string;

  @ApiPropertyOptional({
    description: 'El precio del producto',
    example: 150.75,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio debe ser un número con maximo 2 decimales' },
  )
  @Min(0, { message: 'El precio no puede ser negativo' })
  precio?: number;
}
