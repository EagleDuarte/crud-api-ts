import { Request, Response, NextFunction } from "express";

export const actionsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Adicionar e listar as notas.");
  next();
};
