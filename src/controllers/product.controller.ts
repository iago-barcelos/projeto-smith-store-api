import { RequestHandler } from 'express';
import productService from '../services/product.service';

const createProduct:RequestHandler = async (req, res) => {
  const createdProduct = await productService.createProduct(req.body);

  const { status, data } = createdProduct;

  return res.status(status).json(data);
};

export default {
  createProduct,
};