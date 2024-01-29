import { NextFunction, Request, Response } from 'express';
import jwt from '../utils/jwt';
import UserModel from '../database/models/user.model';

async function ValidateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = await jwt.verify(authorization);

    await UserModel.findOne({ where: { username: decoded.username } });
    next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ message: 'Invalid token' });
    } 
  }
}

export default ValidateToken;