export class ProductoCamposNoProvistosException extends Error {
  constructor() {
    super(`Datos de nombre / descripción / precio no provistos`);
    this.name = 'ProductoCamposNoProvistosException';
  }
}
