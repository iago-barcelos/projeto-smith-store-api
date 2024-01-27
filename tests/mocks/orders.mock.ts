import { Order } from "../../src/types/Order";
import OrderModel from '../../src/database/models/order.model';

const OrdersFromModel = [
  OrderModel.build({
    id: 1,
    userId: 1,
    productId: [
      1, 2
    ]
  })
];

const OrdersFromService: Order[] = [
  {
    id: 1,
    userId: 1,
    productId: [2, 1]
  },
  {
    id: 2,
    userId: 3,
    productId: [4, 3]
  },
  { id: 3, userId: 2, productId: [ 5 ] }
];

export default {
  OrdersFromModel,
  OrdersFromService,
}