export interface IReduceProductResponse {
  date: string;
  productIds: number[];
  numOfProducts: number;
}

export interface IProduct {
  id: number;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  created_at: string;
  handle: string;
  updated_at: string;
  published_at: string;
  template_suffix: string;
  published_scope: string;
  tags: string;
  variants: IVariant[];
  options: IOption[];
  images: IImage[];
  image: IImage2;
}

export interface IVariant {
  id: number;
  product_id: number;
  title: string;
  price: string;
  sku: string;
  position: number;
  compare_at_price: string;
  fulfillment_service: string;
  inventory_management: any;
  option1: string;
  option2: string;
  option3: any;
  created_at: string;
  updated_at: string;
  taxable: boolean;
  barcode?: string;
  grams: number;
  image_id: number;
  weight: number;
  weight_unit: string;
  requires_shipping: boolean;
  quantity_rule: IQuantityRule;
  quantity_price_breaks: any[];
}

export interface IQuantityRule {
  min: number;
  max: any;
  increment: number;
}

export interface IOption {
  id: number;
  product_id: number;
  name: string;
  position: number;
  values: string[];
}

export interface IImage {
  id: number;
  product_id: number;
  position: number;
  created_at: string;
  updated_at: string;
  alt: any;
  width: number;
  height: number;
  src: string;
  variant_ids: number[];
}

export interface IImage2 {
  id: number;
  product_id: number;
  position: number;
  created_at: string;
  updated_at: string;
  alt: any;
  width: number;
  height: number;
  src: string;
  variant_ids: number[];
}
