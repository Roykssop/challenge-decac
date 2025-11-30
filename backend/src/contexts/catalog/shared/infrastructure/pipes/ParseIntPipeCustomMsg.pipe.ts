import { ParseIntPipe, BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ParseIntPipeCustomMsg extends ParseIntPipe {
  constructor() {
    super({
      exceptionFactory: () => {
        throw new BadRequestException('El ID debe ser un número entero válido');
      },
    });
  }
}
