import { Request, Response } from 'express';
import productService from '../services/product.service';

const createProduct = async (req: Request, res: Response) => {
  const createdProduct = await productService.createProduct(req.body);

  const { status, data } = createdProduct;

  return res.status(status).json(data);
};

const getProducts = async (req: Request, res: Response) => {
  const products = await productService.getProducts();
  const { status, data } = products;

  return res.status(status).json(data);
};

export default {
  createProduct,
  getProducts,
};