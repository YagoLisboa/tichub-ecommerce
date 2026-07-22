import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    res.status(400).json({ error: "Erro de Validação", details: err.flatten().fieldErrors });
    return;
  }
  
  if (err.message === "NOT_FOUND") {
    res.status(404).json({ error: "Registro não encontrado." });
    return;
  }

  console.error("Erro interno:", err);
  res.status(500).json({ error: "Erro interno do servidor." });
};