export class ProductoExistenteException extends Error {
  constructor(nombre: string) {
    super(`El producto con el nombre <${nombre}> ya existe`);
    this.name = 'ProductoExistenteException';
  }
}
