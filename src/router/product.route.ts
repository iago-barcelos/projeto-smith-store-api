import { Router } from 'express';
import productController from '../controllers/product.controller';

const productsRouter = Router();

productsRouter.post('/', productController.createProduct);
productsRouter.get('/', productController.getProducts);

export default productsRouter;