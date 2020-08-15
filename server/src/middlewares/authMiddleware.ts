import * as jwt from 'jsonwebtoken';
import authConfig from '../config/auth';
import { Request, Response, NextFunction } from 'express';

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Checks if there is an authentication header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token was not provided' });
  }

  // Gets only the actual token
  const [, token] = authHeader.split(' ');

  // Verifies token
  jwt.verify(token, authConfig.secret, function (err: any, decodedToken: any) {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    } else {
      (<any>req).userId = decodedToken.id;
      (<any>req).userEmail = decodedToken.email;
      next();
    }
  });
}
