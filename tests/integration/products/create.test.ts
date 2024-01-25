import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import productsModel from '../../../src/database/models/product.model'
import productsMock from '../../mocks/products.mock';
import app from '../../../src/app'

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });
  describe('Testa comportamento da requisição com dados válidos', function() {
    it('Retorna status 201 e o produto cadastrado', async function() {
      const mocking = productsModel.build(productsMock.mockedProduct)

      sinon.stub(productsModel, 'create').resolves(mocking)

      const response = await chai.request(app).post("/products").send(productsMock.mockedProduct)

      expect(response.status).to.equal(201)
    })
  });
});
