import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productsMock from '../../mocks/products.mock';
import productService from '../../../src/services/product.service';
import productController from '../../../src/controllers/product.controller';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Retorna status 201 e o produto criado no banco de dados', async function() {
    req.body = productsMock.mockedProduct;
    sinon.stub(productService, 'createProduct').resolves({
      status: 201,
      data: productsMock.mockedProduct
    })

    await productController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productsMock.mockedProduct);
  })

});
