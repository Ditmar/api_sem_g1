import * as jwt from 'jsonwebtoken';
const secretKey = process.env.SECRET_KEY || 'seminario';
import { Response, Request, NextFunction } from 'express';


export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }
  console.log(token);

  const tokenB = token.split(' ');
  
  jwt.verify(tokenB[1], secretKey, (err:any, decoded:any) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    console.log(decoded);
    next();
  });
}