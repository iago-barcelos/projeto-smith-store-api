import { Router } from 'express';
import loginController from '../controllers/login.controller';

const loginRouter = Router();

loginRouter.post('/', loginController.userLogin);

export default loginRouter;