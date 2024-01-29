import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import UserModel from '../../../src/database/models/user.model'
import loginMock from '../../mocks/login.mock';
import app from '../../../src/app'
import orderMock from '../../mocks/order.mock';
import OrderModel from '../../../src/database/models/order.model';

chai.use(chaiHttp);

describe('POST /orders', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Retorna status 201 e o produto criado', async function() {
    const mockUser = UserModel.build(loginMock.validFieldsUser);

    sinon.stub(UserModel, 'findOne').resolves(mockUser);

    const headers = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJIYWdhciIsImlhdCI6MTcwNjU2OTQ2M30.3L4qy2CQ7ihYH7GbAVUsk118ZBxVKSbhsL0-DQDA8uo';

    const response = await chai.request(app).post('/orders').set({ Authorization: headers }).send(orderMock.orderRequestMock);

    const mockedOrder = OrderModel.build(orderMock.orderResponseMock);

    sinon.stub(OrderModel, 'create').resolves(mockedOrder);

    expect(response.status).to.equal(201);
  })

});
