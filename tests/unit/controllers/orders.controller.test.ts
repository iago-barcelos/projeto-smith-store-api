import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import orderController from '../../../src/controllers/order.controller'
import ordersMock from '../../mocks/order.mock';

chai.use(sinonChai);

describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });


  it('Deve retornar status 200 ao buscar os pedidos no banco de dados', async function() {
    await orderController.getOrders(req, res);

    expect(res.status).to.have.been.calledWith(200);
  })
});
