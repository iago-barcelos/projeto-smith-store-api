import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponses';

const createProduct = async (
  product: ProductInputtableTypes,
): Promise<ServiceResponse<Product>> => {
  const productCreated = await ProductModel.create(product);
  return { status: 201, data: productCreated.dataValues };
};

export default {
  createProduct,
};