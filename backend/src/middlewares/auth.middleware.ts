import { Request, Response, NextFunction } from 'express';

// Middleware de Autenticação (Simulado)
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ error: "Acesso não autorizado. Token ausente." });
    return;
  }
  
  // Simula decodificação do JWT
  (req as any).user = { role: token.includes('admin-token') ? 'admin' : 'customer' };
  next();
};

// Middleware de Autorização (Role-based)
export const authorize = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (user.role !== requiredRole) {
      res.status(403).json({ error: "Acesso proibido. Permissão insuficiente." });
      return;
    }
    next();
  };
};