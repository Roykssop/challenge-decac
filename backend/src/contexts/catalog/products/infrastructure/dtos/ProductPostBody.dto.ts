import { IsNumber, IsString, MaxLength, Min } from 'class-validator';

export class ProductPostBodyDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MaxLength(255, { message: 'El nombre no debe superar los 255 caracteres' })
  nombre: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  descripcion: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio debe ser un número con dos decimales' },
  )
  @Min(0, { message: 'El precio no puede ser negativo' })
  precio: number;
}
