import express, { type Request, type Response } from 'express';

import { authCheck } from '@/middlewares/auth-check';
import { Track, ZodTrackSchema } from '@/models/track';
import { type IUser } from '@/models/user';
import { validateRequest } from '@/utils/http';

const router = express.Router();

router.use(authCheck);

type AuthenticatedRequest = Request & {
  user: IUser;
}

// @ts-expect-error: blud is wilding over here with middlewares
router.get('/', async (req: AuthenticatedRequest, res: Response) => {
  const tracks = await Track.find({ userId: req.user._id });
  res.send(tracks);
});

// @ts-expect-error: blud is wilding over here with middlewares
router.post('/', validateRequest(ZodTrackSchema), async (req: AuthenticatedRequest, res: Response) => {
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
});

export { router };
