import jwt from 'jsonwebtoken';
import { Payload } from '../types/Login';

const secret = process.env.JWT_SECRET || 'secret';

const sign = (payload: Payload): string => {
  const token = jwt.sign(payload, secret);
  return token;
};

const verify = (token: string): Payload => {
  const [, tokenString] = token.split(' '); 
  const data = jwt.verify(tokenString, secret) as Payload;
  return data;
};

export default {
  sign,
  verify,
};