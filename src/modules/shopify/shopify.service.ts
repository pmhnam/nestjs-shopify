import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IProduct } from '../products/interfaces';
import { ICreateProductDto } from './shopify.interface';

@Injectable()
export class ShopifyService {
  private accessToken: string;
  private baseUrl: string;

  constructor() {
    this.accessToken = process.env.SHOPIFY_APP_TOKEN;
    this.baseUrl = process.env.SHOPIFY_STORE_BASE_URL;
  }

  async fetch(dto: { url: string; method: string; params?: any; data?: any }) {
    const { url, method, params, data } = dto;
    const res = await axios({
      url,
      method,
      data,
      headers: {
        'X-Shopify-Access-Token': this.accessToken,
        'Content-Type': 'application/json',
      },
      params,
    });

    return res.data;
  }

  async fetchProducts(dto: {
    begin: string;
    end: string;
    order?: string;
    since_id?: number;
  }) {
    const { begin, end, since_id } = dto;

    const created_at_min = new Date(begin);
    const created_at_max = new Date(end);

    created_at_min.setHours(0, 0, 0, 0);
    created_at_max.setHours(0, 0, 0, 0);
    created_at_max.setDate(created_at_max.getDate() + 1);

    const url = `${this.baseUrl}/products.json`;
    const params = {
      created_at_min: created_at_min.toISOString(),
      created_at_max: created_at_max.toISOString(),
      fields: 'id,title,product_type,image,created_at',
      limit: 250,
      ...(since_id && { since_id: `${since_id}` }),
    };

    const data: { products: IProduct[] } = await this.fetch({
      url,
      method: 'get',
      params,
    });

    return data;
  }

  async fetchProductByLink(url: string) {
    const data: { product: IProduct } = await this.fetch({
      url,
      method: 'get',
    });
    return data;
  }

  async createProduct(dto: ICreateProductDto) {
    const url = `${this.baseUrl}/products.json`;
    const data = await this.fetch({
      url,
      method: 'post',
      data: { product: dto },
    });
    return data;
  }
}
