import { Request, Response, NextFunction } from "express";

export const logGetMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Adicionar e listar as notas.");
  next();
};
