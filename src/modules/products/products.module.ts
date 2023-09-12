import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { productsProviders } from './products.providers';
import { ShopifyService } from '../shopify/shopify.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ...productsProviders, ShopifyService],
})
export class ProductsModule {}
