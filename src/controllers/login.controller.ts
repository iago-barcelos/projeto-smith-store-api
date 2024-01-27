import { Request, Response } from 'express';
import loginService from '../services/login.service';

const userLogin = async (req: Request, res: Response) => {
  const user = await loginService.userLogin(req.body);

  const { status, data } = user;

  return res.status(status).json(data);
};

export default {
  userLogin,
};