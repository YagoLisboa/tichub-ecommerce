import express, { Request, Response, NextFunction } from 'express';
import { productsRouter } from './routers/products.router';
import { ordersRouter } from './routers/orders.router';
import { categoryRouter } from './routers/category.router';

const app = express();
const PORT = 3000;

// Permite que o Express compreenda corpos JSON nas requisições
app.use(express.json());

// Desafio: Middleware Global de Logs -> [DATA] MÉTODO / URL
app.use((req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Vinculação dos Routers Isolados

app.use('/orders', ordersRouter);
app.use('/products', productsRouter);
app.use('/category', categoryRouter); // Vinculação do novo router estruturado

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT} no padrão Dev Sênior!`);
});