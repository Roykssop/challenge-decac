import { InvalidArgumentException } from '../exceptions/InvalidArgument.exception';

export type Primitives = string | number | boolean | Date;

export abstract class ValueObject<T extends Primitives> {
  readonly value: T;

  constructor(value: T) {
    this.value = value;
    this.ensureIsValid();
  }

  ensureIsValid(): void {
    if (this.value === null || this.value === undefined) {
      throw new InvalidArgumentException(
        'El valor no puede ser nulo o indefinido',
      );
    }
  }

  equalsTo(other: ValueObject<T>): boolean {
    return (
      this.constructor.name === other.constructor.name &&
      this.value === other.value
    );
  }
}
