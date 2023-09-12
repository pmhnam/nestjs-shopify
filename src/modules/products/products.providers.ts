import { PRODUCT_REPOSITORY } from 'src/core/constants';
import Product from './entities/product.entity';

export const productsProviders = [
  {
    provide: PRODUCT_REPOSITORY,
    useValue: Product,
  },
];
