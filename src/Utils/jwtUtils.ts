import jwt, { JwtPayload } from 'jsonwebtoken';
import env from '../config/env';

export class TokenManagement {
  private static readonly _secretKey = env.SECRET_KEY;
  public static get secretKey() {
    return TokenManagement._secretKey;
  }

  static generateToken(idusers: number): string {
    return jwt.sign({ idusers }, TokenManagement.secretKey, { expiresIn: '1h' });
  }

  static verifyToken(token: string): JwtPayload | null {
    try {
      const decodedToken = jwt.verify(token, TokenManagement.secretKey) as JwtPayload;
      return decodedToken;
    } catch (error) {
      console.error('Error al verificar el Token:', error);
      return null;
    }
  }
}
