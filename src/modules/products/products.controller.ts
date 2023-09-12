import { Controller, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/upsert')
  createMany(@Body() dto: { begin: string; end: string }) {
    return this.productsService.fetchAndSaveProducts(dto);
  }

  @Post('/crawl-create')
  crawlAndCreate(@Body('link') dto: string) {
    return this.productsService.crawlAndCreate(dto);
  }
}
