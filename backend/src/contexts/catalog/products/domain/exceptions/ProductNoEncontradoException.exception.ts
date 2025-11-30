export class ProductNoEncontradoException extends Error {
  constructor(id: number) {
    super(`El producto con el id <${id}> no existe`);
    this.name = 'ProductNoEncontradoException';
  }
}
