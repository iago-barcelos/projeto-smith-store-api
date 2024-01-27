import { Router } from 'express';
import productController from '../controllers/product.controller';
import validateProductNameInRequest from '../middlewares/productNameField.middleware';
import validateProductPriceInRequest from '../middlewares/productPriceField.middleware';

const productsRouter = Router();

productsRouter.post(
  '/', 
  validateProductNameInRequest,
  validateProductPriceInRequest, 
  productController.createProduct,
);
productsRouter.get('/', productController.getProducts);

export default productsRouter;