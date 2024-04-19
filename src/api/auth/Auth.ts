import { Action } from 'routing-controllers';
import { AuthorizationChecker } from 'routing-controllers/types/AuthorizationChecker';
import { credential } from '../../config/utils/env';

export const authorizationChecker: AuthorizationChecker = async (
  action: Action,
  roles: any[]
): Promise<boolean> => {
  const tokenExist = action.request.headers['authorization'];

  if (!tokenExist) return false;

  const jwt = require('jsonwebtoken');
  const jwtToken = tokenExist.split(' ')[1];
  try {
    const decoded = jwt.verify(jwtToken, credential.jwtSecret);

    if (roles[0] === decoded.type) {
      action.request.userId = decoded.id;
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
};
