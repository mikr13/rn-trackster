import type { NextFunction, Request, Response } from "express";

export const asyncHandler = (fn: (req: Request, res: Response, next?: NextFunction) => Promise<Response | undefined>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };
