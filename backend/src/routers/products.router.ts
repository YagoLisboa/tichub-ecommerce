import { Router, Request, Response } from 'express';

export const productsRouter = Router();

// Base de dados fictícia para simular a resposta do catálogo
const mockProducts = [
  { id: "1", name: "Teclado Mecânico RGB", price: 349.90, category: "perifericos" },
  { id: "2", name: "Mouse Gamer 16000 DPI", price: 219.00, category: "perifericos" },
  { id: "3", name: "Monitor 144Hz 1ms", price: 1299.00, category: "monitores" }
];

// 1. Listagem Geral com Filtro Opcional de Query String: GET /products?category=...
productsRouter.get('/', (req: Request, res: Response) => {
  const { category } = req.query;

  if (category) {
    const filtered = mockProducts.filter(p => p.category === String(category).toLowerCase());
    res.json(filtered);
    return;
  }

  res.json(mockProducts);
});

// 2. Consulta Específica via ID por Parâmetro: GET /products/:id
productsRouter.get('/:id', (req: Request, res: Response) => {
  const idParam = Number(req.params.id);

  // Regra de Negócio: Se o ID for negativo, devolve 400 (Bad Request)
  if (idParam < 0) {
    res.status(400).json({ error: "O ID do produto não pode ser um número negativo." });
    return;
  }

  const product = mockProducts.find(p => p.id === req.params.id);

  if (!product) {
    res.status(404).json({ error: "Produto não encontrado." });
    return;
  }

  res.json(product);
});