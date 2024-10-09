import { Request } from "express";

export const getUid = (req: Request): string | undefined => {
  return req.user ? req.user.uid : undefined;
};
