import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class ProductPutBodyDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MaxLength(255, { message: 'El nombre no debe superar los 255 caracteres' })
  nombre?: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  descripcion?: string;

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio debe ser un número con maximo 2 decimales' },
  )
  @Min(0, { message: 'El precio no puede ser negativo' })
  precio?: number;
}
