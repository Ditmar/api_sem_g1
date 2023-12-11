// import { Request, Response, NextFunction } from 'express';
// import HttpStateCodes from '../utils/http-state-codes';

// export const RefreshTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  
//   const expectedFields = ['refreshToken'];
//   const validKeys = Object.keys(req.body);

//   const missingFields = expectedFields.filter((field) => !validKeys.includes(field));

//   const extraFields = validKeys.filter((key) => !expectedFields.includes(key));

//   if (missingFields.length > 0) {
//     return res.json({
//       message:`Faltan los siguientes campos en la solicitud: ${missingFields.join(', ')}`, 
//       status:HttpStateCodes.BAD_REQUEST});
//   }

//   if (extraFields.length > 0) {
//     return res.json({message:`Campos no válidos en la solicitud: ${extraFields.join(', ')}`, status:HttpStateCodes.BAD_REQUEST});
//  }

//   next();
// };


import { Request, Response, NextFunction } from 'express';
import HttpStateCodes from '../utils/http-state-codes';
import { resfreshTokenSchema } from '../schemas/refresh-token-schemas';

export const RefreshTokenMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const schema = resfreshTokenSchema

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