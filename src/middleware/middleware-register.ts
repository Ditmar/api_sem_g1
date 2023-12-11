import { Request, Response, NextFunction } from 'express';
import HttpStateCodes from '../utils/http-state-codes';
import { registerSchema } from '../schemas/register-schemas';

export const RegisterMiddleware = (request: Request, response: Response, next: NextFunction) => {
  
  const schema = registerSchema

  const { error, value } = schema.validate(request.body);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(', ');
    return response.status(HttpStateCodes.BAD_REQUEST).json({
      message:  `Error de validación: ${errorMessage}`,
    });
  }
  
  request.body = value;

  next();
};