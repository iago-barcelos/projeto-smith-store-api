import { Request, Response } from 'express';
import orderService from '../services/order.service';

const getOrders = async (req: Request, res: Response) => {
  const orders = await orderService.getOrders();

  return res.status(orders.status).json(orders.data);
};

export default {
  getOrders,
};