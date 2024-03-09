import { UserController } from '../controllers/userControllers';
import express from 'express';
import { authenticateToken } from '../../middleware/authMiddleware';

const userRouter = express.Router();
const userControllers = new UserController();

userRouter.post('/register', userControllers.register);
userRouter.post('/login', userControllers.login);
userRouter.put('users/update', authenticateToken, userControllers.updateUser);
userRouter.put('users/desactivate', authenticateToken, userControllers.desactivateUser);
userRouter.put('users/reactivate', authenticateToken, userControllers.reactivateUser);

export default userRouter;
