import { Request, Response, NextFunction } from "express";

export const logMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Middleware tá bombando!");

  next();
};
