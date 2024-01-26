import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import productModel from '../../../src/database/models/product.model';
import productsMock from '../../mocks/products.mock';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Retorna status 200 em caso de sucesso', async function() {
    const mocking = productModel.bulkBuild(productsMock.productsGotFromDB);

    sinon.stub(productModel, 'findAll').resolves(mocking)
    const response = await chai.request(app).get('/products')

    expect(response.status).to.equal(200);
  })
});
