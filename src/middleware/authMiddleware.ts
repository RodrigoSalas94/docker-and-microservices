import { NextFunction, Response } from 'express';
import { TokenManagement } from '../Utils/jwtUtils';
import { AuthenticationRequest } from '../web/request';

export const authenticateToken = (req: AuthenticationRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
  }

  const decodedToken = TokenManagement.verifyToken(token);
  if (!decodedToken) {
    return res.status(403).json({ message: 'Token de autenticación inválido' });
  }

  req.user = decodedToken;

  next();
};
