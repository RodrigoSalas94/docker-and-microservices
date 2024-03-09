import { UserRepository } from '../repositories/userRepository';
import { UserRegister, UserEmail, User } from '../types/User';
import { TokenManagement } from '../../Utils/jwtUtils';
import { Encryption } from '../../Utils/encryptionUtils';
const userRepository = new UserRepository();
const encryption = new Encryption();

export class UserService {
  async registerUser(user: UserRegister): Promise<{ user: UserEmail; token: string }> {
    try {
      const existingUser = await userRepository.findUserByEmail(user.email);
      if (existingUser) {
        throw new Error('user already exists');
      }

      const hashedPassword = await encryption.hashPassword(user.password);
      const newUser = await userRepository.createUser(user.email, hashedPassword);
      const token = TokenManagement.generateToken(newUser.userId!);
      const userEmail: UserEmail = {
        email: newUser.email,
      };

      return { user: userEmail, token };
    } catch (error) {
      throw new Error(`error registering user: ${error}`);
    }
  }

  async loginUser(user: UserRegister): Promise<{ user: UserEmail; token: string }> {
    try {
      const userLogin = await userRepository.findUserByEmail(user.email);
      if (!userLogin) {
        throw new Error('User not found');
      }

      const passwordMatch = await encryption.comparePassword(user.password, userLogin.password);
      if (!passwordMatch) {
        throw new Error('Incorrect password');
      }

      const token = TokenManagement.generateToken(userLogin.userId!);

      const userEmail: UserEmail = {
        email: user.email,
      };

      return { user: userEmail, token };
    } catch (error) {
      throw new Error(`Error logging in user: ${error}`);
    }
  }

  async updateUser(userId: number, userData: Partial<User>): Promise<User | null> {
    try {
      const updatedUser = await userRepository.updateUser(userId, userData);
      if (!updatedUser) {
        throw new Error(`User with ID ${userId} not found`);
      }
      return updatedUser;
    } catch (error) {
      throw new Error(`Error updating user: ${error}`);
    }
  }

  async desactivateUser(userId: number): Promise<void> {
    try {
      await userRepository.desactivateUser(userId);
    } catch (error) {
      throw new Error(`Error desactivating user: ${error}`);
    }
  }

  async reactivateUser(userId: number): Promise<void> {
    try {
      await userRepository.reactivateUser(userId);
    } catch (error) {
      throw new Error(`Error reactivating user: ${error}`);
    }
  }
}
