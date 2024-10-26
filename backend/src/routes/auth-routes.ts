import { User, ZodUserSchema } from '@/models/user';
import { env } from '@/utils/env';
import { validateRequest } from '@/utils/http';
import express, { type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// @ts-expect-error: blud is wilding over here with middlewares
router.post('/signup', validateRequest(ZodUserSchema), async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, env.JWT_SECRET_KEY as string);
    res.send({ token });
  } catch (err: unknown) {
    return res.status(422).send({ error: (err as Error).message || 'Failed to signup' });
  }
});

// @ts-expect-error: blud is wilding over here with middlewares
router.post('/signin', validateRequest(ZodUserSchema), async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: 'Invalid email or password' });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY as string);
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: (err as Error).message || 'Invalid email or password' });
  }
});

export { router };
