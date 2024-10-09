import { User, type IUser } from '@/models/user';
import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

interface JwtPayload {
  userId: string;
}

export const authCheck = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).send({ error: 'You must be logged in.' });
    return;
  }

  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
    if (err) {
      res.status(401).send({ error: 'You must be logged in.' });
      return;
    }

    const { userId } = payload as JwtPayload;

    try {
      const user = await User.findById(userId);
      if (!user) {
        res.status(401).send({ error: 'User not found.' });
        return;
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(500).send({ error: 'Internal server error.' });
    }
  });
};
