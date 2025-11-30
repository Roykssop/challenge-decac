import { StringValueObject } from '../../shared/domain/StringValueObject';
import { InvalidArgumentException } from '../../shared/exceptions/InvalidArgument.exception';

const MAX_CHARS = 255;
export class ProductNombre extends StringValueObject {
  constructor(nombre: string) {
    super(nombre);
    this.ensureCumpleCaracteresMaximos(nombre);
  }

  private ensureCumpleCaracteresMaximos(nombre: string): void {
    if (nombre.length > MAX_CHARS) {
      throw new InvalidArgumentException(
        `El nombre no debe superar los ${MAX_CHARS} caracteres`,
      );
    }
  }
}
