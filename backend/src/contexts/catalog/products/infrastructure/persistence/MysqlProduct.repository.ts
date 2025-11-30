import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { Product } from '../../domain/Product';
import { Nullable } from 'src/contexts/catalog/shared/domain/Nullable';
import { Inject } from '@nestjs/common';
import { ProductRepository } from '../../domain/Product.repository';
import { ProductId } from '../../domain/ProductId';
import { ProductNombre } from '../../domain/ProductNombre';

export class MysqlProductRepository implements ProductRepository {
  constructor(@Inject('MysqlProvider') private readonly mysqlProvider: Pool) { }

  async save(product: Product): Promise<Product> {
    const { nombre, descripcion, precio } = product.toPrimitives();

    const [result] = await this.mysqlProvider.query<ResultSetHeader>(
      'INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)',
      [nombre, descripcion, precio],
    );

    const newId = result.insertId;
    if (!newId) {
      return null;
    }

    return await this.findById(new ProductId(newId));
  }

  async findById(id: ProductId): Promise<Nullable<Product>> {
    const [rows] = await this.mysqlProvider.query<RowDataPacket[]>(
      'SELECT * FROM productos WHERE id = ?',
      [id.value],
    );

    if (!rows.length) {
      return null;
    }

    const producto = rows[0];

    return Product.fromPrimitives({
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      createdAt: producto.created_at,
      updatedAt: producto.updated_at,
    });
  }

  async existsByNombre(nombre: ProductNombre): Promise<boolean> {
    const [rows] = await this.mysqlProvider.query<RowDataPacket[]>(
      'SELECT 1 FROM productos WHERE nombre = ? LIMIT 1',
      [nombre.value],
    );

    return Boolean(rows.length > 0);
  }
}
