import { UserService } from '../services/userServices';
import { User } from '../types/User';
import { Request, Response, NextFunction } from 'express';
const userService = new UserService();

export class UserController {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData = req.body;
      const result = await userService.registerUser(userData);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error registering user:', error);
      return next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData = req.body;
      const result = await userService.loginUser(userData);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error login user:', error);
      return next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      const userData: Partial<User> = req.body;

      const updatedUser = await userService.updateUser(userId, userData);

      if (!updatedUser) {
        res.status(404).json({ error: `User with ID ${userId} not found` });
        return;
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      next(error);
    }
  }
  async desactivateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = Number(req.params.userId);

      await userService.desactivateUser(userId);

      res.status(200).json({ message: 'User desactivated successfully' });
    } catch (error) {
      console.error('Error desactivating user:', error);
      next(error);
    }
  }

  async reactivateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = Number(req.params.userId);

      await userService.reactivateUser(userId);

      res.status(200).json({ message: 'User reactivated successfully' });
    } catch (error) {
      console.error('Error reactivating user:', error);
      next(error);
    }
  }
}
