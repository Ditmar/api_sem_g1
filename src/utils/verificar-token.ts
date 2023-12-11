import * as jwt from 'jsonwebtoken';
const secretKey = process.env.SECRET_KEY || 'seminario';
import { Response, Request, NextFunction } from 'express';
import HttpStateCodes from './http-state-codes';
import { authMessages } from '../busines/messages';


export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(HttpStateCodes.FORBIDDEN).json({ message: authMessages.tokenMissing });
  }

  const tokenB = token.split(' '); 
  jwt.verify(tokenB[1], secretKey, (err:any, decoded:any) => {
    if (err) {
      return res.status(HttpStateCodes.UNAUTHORIZED).json({ message: authMessages.tokenInvalid });
    } 
    next();
  });
}