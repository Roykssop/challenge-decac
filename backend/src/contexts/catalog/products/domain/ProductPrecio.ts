import { IntValueObject } from '../../shared/domain/IntValueObject';
import { InvalidArgumentException } from '../../shared/exceptions/InvalidArgument.exception';

export class ProductPrecio extends IntValueObject {
  constructor(precio: number) {
    super(precio);
    this.ensureIsPositive(precio);
  }

  private ensureIsPositive(precio: number): void {
    if (precio < 0) {
      throw new InvalidArgumentException('El precio no puede ser negativo');
    }
  }
}
