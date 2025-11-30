import { ProductPrimitives } from '../../domain/Product';

export type ProductWithDolarDto = ProductPrimitives & { precio_usd: number };
