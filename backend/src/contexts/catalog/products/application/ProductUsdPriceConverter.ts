import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductUsdPriceConverter {
  constructor(private readonly configService: ConfigService) { }

  execute(precioPesos: number): number {
    const precioDolar = this.configService.get<number>('PRECIO_USD');
    const cotizacion = precioDolar ? Number(precioDolar) : 1;
    const precio_usd = Number((precioPesos / cotizacion).toFixed(2));
    return precio_usd;
  }
}
