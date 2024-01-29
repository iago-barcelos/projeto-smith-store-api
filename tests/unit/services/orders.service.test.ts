import { expect } from 'chai';
import sinon from 'sinon';
import OrderModel from '../../../src/database/models/order.model';
import ordersMock from '../../mocks/order.mock';
import orderService from '../../../src/services/order.service'
import UserModel from '../../../src/database/models/user.model';
import loginMock from '../../mocks/login.mock';

describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Retorna status 200 e a lista de pedidos com sucesso', async function() {
    sinon.stub(OrderModel, 'findAll').resolves(ordersMock.OrdersFromModel);

    const response = await orderService.getOrders()

    expect(response.status).to.be.equal(200)
  })

  /* it('Retorna status 201 e o pedido criado com sucesso', async function() {
    sinon.stub(UserModel, 'findOne').resolves(loginMock.validFieldsUser)
  }) */
});
