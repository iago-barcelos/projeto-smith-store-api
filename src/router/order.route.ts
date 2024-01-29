import { Router } from 'express';
import orderController from '../controllers/order.controller';
import validateOrderUserInRequest from '../middlewares/orderUserField.middleware';
import validateOrderProductInRequest from '../middlewares/orderProductField.middleware';
import ValidateToken from '../middlewares/validateToken.middleware';

const orderRouter = Router();

orderRouter.get('/', orderController.getOrders);
orderRouter.post(
  '/',
  ValidateToken, 
  validateOrderUserInRequest,
  validateOrderProductInRequest, 
  orderController.createOrder,
);

export default orderRouter;