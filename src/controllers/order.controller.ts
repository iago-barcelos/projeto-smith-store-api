import { Request, Response } from 'express';
import orderService from '../services/order.service';

const getOrders = async (req: Request, res: Response) => {
  const orders = await orderService.getOrders();

  return res.status(orders.status).json(orders.data);
};

const createOrder = async (req: Request, res: Response) => {
  const created = await orderService.createOrder(req.body);

  const { status, data } = created;

  return res.status(status).json(data);
};

export default {
  getOrders,
  createOrder,
};