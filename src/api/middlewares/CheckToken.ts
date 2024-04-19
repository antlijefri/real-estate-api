import { NextFunction } from 'express';
import { credential } from '../../config/utils/env';

export const checkToken = async (
  request: any,
  response: any,
  next: NextFunction
): Promise<any> => {
  const tokenExist: string | undefined = request.headers['authorization'];

  if (tokenExist) {
    const jwt = require('jsonwebtoken');
    const jwtToken = tokenExist.split(' ')[1];
    try {
      const decoded = jwt.verify(jwtToken, credential.jwtSecret);
      request.user = decoded;
      return next();
    } catch (err) {
      return response.status(400).send({
        message: `${err}`,
      });
    }
  }

  return response.status(401).send({
    message: `Unauthorized Request..!`,
  });
};
