import { UserModel } from '../models/userModel';
import { User } from '../types/User';

export class UserRepository {
  async createUser(email: string, password: string): Promise<User> {
    try {
      return await UserModel.create({ email, password });
    } catch (error) {
      throw new Error(`Error creating user: ${error}`);
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      throw new Error(`Error searching email: ${error}`);
    }
  }

  async updateUser(userId: number, userData: Partial<User>): Promise<User | null> {
    try {
      return await UserModel.findByIdAndUpdate(userId, userData);
    } catch (error) {
      throw new Error(`Error updating user: ${error}`);
    }
  }

  async desactivateUser(userId: number): Promise<void> {
    try {
      await UserModel.findByIdAndUpdate(userId, { active: false });
    } catch (error) {
      throw new Error(`Error desactivating user: ${error}`);
    }
  }

  async reactivateUser(userId: number): Promise<void> {
    try {
      await UserModel.findByIdAndUpdate(userId, { active: true });
    } catch (error) {
      throw new Error(`Error activating user: ${error}`);
    }
  }
}
