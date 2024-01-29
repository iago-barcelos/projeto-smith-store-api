import { literal } from 'sequelize';
import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponses';
import { Order } from '../types/Order';
import UserModel from '../database/models/user.model';

const getOrders = async (): Promise<ServiceResponse<OrderSequelizeModel[]>> => {
  const orders = await OrderModel.findAll({
    include: [
      { model: ProductModel, 
        as: 'productIds', 
        foreignKey: 'orderId',
        attributes: [],
      },
    ],
    attributes: ['id', 'userId', [literal('JSON_ARRAYAGG(`productIds`.id)'), 'productIds']],
    group: ['Order.id'],
    raw: true,
  });

  return { status: 200, data: orders };
};

const createOrder = async (order:Order): Promise<ServiceResponse<Order>> => {
  const { userId, productId } = order;

  const user = await UserModel.findOne({ where: { id: userId } });
  /* console.log(user); */
  
  if (!user) {
    return { status: 404, data: { message: '"userId" not found' } };
  }
  
  const created = await OrderModel.create({ userId });
  
  const { id } = created.dataValues;

  const productIdArray: Promise<[affectedCount: number]>[] = [];

  productId?.map((item) => productIdArray
    .push(ProductModel.update({ orderId: id }, { where: { id: item } })));

  await Promise.all(productIdArray);

  return { status: 201, data: order };
};

export default {
  getOrders,
  createOrder,
};