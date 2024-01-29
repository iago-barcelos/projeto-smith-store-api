import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { LoginReqBody, Token } from '../types/Login';
import { ServiceResponse } from '../types/ServiceResponses';
import jwt from '../utils/jwt';

const userLogin = async (login: LoginReqBody): Promise<ServiceResponse<Token>> => {
  if (!login.username || !login.password) {
    return { status: 400, data: { message: '"username" and "password" are required' } };
  }

  const user = await UserModel.findOne({ 
    where: { username: login.username },
  });

  if (!user) {
    return { status: 401, data: { message: 'Username or password invalid' } };
  }

  const bcryptComparing = await bcrypt.compare(login.password, user.dataValues.password);

  if (!bcryptComparing) {
    return { status: 401, data: { message: 'Username or password invalid' } };
  }

  const { id, username } = user.dataValues;

  const token = jwt.sign({ id, username });

  return { status: 200, data: { token } };
};

export default {
  userLogin,
};