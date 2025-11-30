export class ProductoNombreExistenteException extends Error {
  constructor(nombre: string) {
    super(`El nombre <${nombre}> de producto ya existe, elija otro`);
    this.name = 'ProductoNombreExistenteException';
  }
}
