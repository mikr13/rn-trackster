import express, { type Request, type Response } from 'express';

import { asyncHandler } from '@/middlewares/async-handler';
import { authCheck } from '@/middlewares/auth-check';
import { Track } from '@/models/track';
import { type IUser } from '@/models/user';

const router = express.Router();

router.use(authCheck);

type AuthenticatedRequest = Request & {
  user: IUser;
}

// @ts-expect-error: blud is wilding over here with middlewares
router.get('/tracks', asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const tracks = await Track.find({ userId: req.user._id });
  res.send(tracks);
}));

// @ts-expect-error: blud is wilding over here with middlewares
router.post('/tracks', asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { name, locations } = req.body;

  if (!name || !locations) {
    return res.status(422).send({ error: 'You must provide a name and locations' });
  }

  try {
    const track = new Track({ name, locations, userId: req.user._id });
    await track.save();
    res.send(track);
  } catch (err: unknown) {
    res.status(422).send({ error: (err as Error).message });
  }
}));

export { router };
