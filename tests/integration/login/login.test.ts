import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import loginMock from '../../mocks/login.mock';
import UserModel from '../../../src/database/models/user.model';
import bcrypt from 'bcryptjs'

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Retorna erro caso o username não esteja na requisição', async function() {
    const response = await chai.request(app).post('/login').send(loginMock.missingUsername);

    expect(response.status).to.equal(400);
    expect(response.body).to.be.deep.equal({ message: '"username" and "password" are required' });
  })

  it('Retorna erro caso o password não esteja na requisição', async function() {
    const response = await chai.request(app).post('/login').send(loginMock.missingPassword);

    expect(response.status).to.equal(400);
    expect(response.body).to.be.deep.equal({ message: '"username" and "password" are required' });
  })

  it('Retorna erro caso o username não exista no banco de dados', async function() {
    sinon.stub(UserModel, 'findOne').resolves(null)
    // o tempo de execução do teste é mais rápido se o stub acontecer primeiro
    const response = await chai.request(app).post('/login').send(loginMock.invalidUsername);

    expect(response.status).to.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Username or password invalid' });
  })

  it('Retorna erro caso o username exista, mas a senha está incorreta', async function() {
    const mockUserSearch = UserModel.build(loginMock.validFieldsUser);
    
    sinon.stub(UserModel, 'findOne').resolves(mockUserSearch)

    const response = await chai.request(app).post('/login').send(loginMock.invalidPassword);

    expect(response.status).to.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Username or password invalid' });
  })

  it('Retorna o token caso o username e password estejam corretos na requisição', async function() {
    const mockUserSearch = UserModel.build(loginMock.validFieldsUser);
    
    await sinon.stub(UserModel, 'findOne').resolves(mockUserSearch)
    
    await sinon.stub(bcrypt, 'compare').resolves(true)

    const response = await chai.request(app).post('/login').send(loginMock.validLogin);


    expect(response.status).to.equal(200);
    expect(response.body).to.have.key('token');
  })
});
