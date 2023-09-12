import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from 'src/core/constants';
import { CreateProductDto } from './dto/create-product.dto';
import { ShopifyService } from '../shopify/shopify.service';
import Product from './entities/product.entity';
import { IProduct, IReduceProductResponse } from './interfaces';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
    private readonly shopifyService: ShopifyService,
  ) {}

  async createMany(dto: CreateProductDto[]): Promise<Product[]> {
    return await this.productRepository.bulkCreate<Product>(dto);
  }

  async create(dto: CreateProductDto): Promise<Product> {
    return await this.productRepository.create<Product>(dto);
  }

  async fetchAndSaveProducts(dto: { begin: string; end: string }) {
    try {
      const allProduct = [] as IProduct[];
      let lastIndexProductId = null;

      while (true) {
        try {
          const { products } = await this.shopifyService.fetchProducts({
            ...dto,
            ...(lastIndexProductId && { since_id: lastIndexProductId }),
          });

          if (!products?.length) {
            break;
          }
          lastIndexProductId = products[products.length - 1].id;
          allProduct.push(...products);
          await this.sleep(1000);
        } catch (error) {
          return error;
        }
      }

      const createProductsDto = [] as CreateProductDto[];

      const objData = allProduct.reduce((acc, cur) => {
        const { id, created_at, title, product_type, image } = cur;

        createProductsDto.push({
          title,
          productType: product_type ?? '',
          imageUrl: image?.src ?? '',
        });

        const date = created_at.split('T')[0];
        if (!acc[date]) {
          acc[date] = { date, productIds: [id], numOfProducts: 1 };
        } else {
          acc[date].productIds.push(id);
          acc[date].numOfProducts += 1;
        }

        return acc;
      }, {} as IReduceProductResponse);

      await this.createMany(createProductsDto);
      const arrData = Object.values(objData);
      return arrData;
    } catch (error) {
      throw error;
    }
  }

  async crawlAndCreate(dto: string) {
    const { product } = await this.shopifyService.fetchProductByLink(dto);
    const { title, body_html, vendor, product_type, image } = product;

    const createProductShopifyDto = {
      title,
      body_html,
      vendor,
      product_type,
      status: 'active',
    };
    await this.shopifyService.createProduct(createProductShopifyDto);

    const createProductDto = {
      title,
      productType: product_type ?? '',
      imageUrl: image?.src ?? '',
    };

    const { id: productId } = await this.create(createProductDto);
    return { productId };
  }

  async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
