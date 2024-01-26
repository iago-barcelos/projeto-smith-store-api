import { expect } from 'chai';
import sinon from 'sinon';
import ProductModel from '../../../src/database/models/product.model';
import productsMock from '../../mocks/products.mock';
import productService from '../../../src/services/product.service';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });
  it('Testa criação de um produto no fluxo de sucesso', async function() {
    const mocking = ProductModel.build(productsMock.mockedProduct);

    sinon.stub(ProductModel, 'create').resolves(mocking);

    const serviceLayer = await productService.createProduct(productsMock.mockedProduct)

    expect(serviceLayer.data).to.be.deep.equal(productsMock.mockedProduct)
    expect(serviceLayer.status).to.be.equal(201);

  })
});
