import { expect } from 'chai';
import sinon from 'sinon';
import OrderModel from '../../../src/database/models/order.model';
import ordersMock from '../../mocks/orders.mock';
import orderService from '../../../src/services/order.service'

describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Retorna status 200 e a lista de pedidos com sucesso', async function() {
    sinon.stub(OrderModel, 'findAll').resolves(ordersMock.OrdersFromModel);

    const response = await orderService.getOrders()

    expect(response.status).to.be.equal(200)
  })
});
