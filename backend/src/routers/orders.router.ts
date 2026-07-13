import { Router, Request, Response } from 'express';

export const ordersRouter = Router();

// 1. Criação de Pedido: POST /orders
ordersRouter.post('/', (req: Request, res: Response) => {
  const { customerName, productIds } = req.body;

  // Desafio: Validação de Body vazio ou incompleto
  if (!customerName || !productIds || !Array.isArray(productIds) || productIds.length === 0) {
    res.status(400).json({ error: "Requisição inválida. O corpo precisa conter customerName e um array productIds." });
    return;
  }

  // Resposta semântica: 201 Created retornando o objeto criado
  res.status(201).json({
    id: `order-${Math.floor(Math.random() * 10000)}`,
    customerName,
    productIds,
    status: "pendente",
    createdAt: new Date()
  });
});

// 2. Atualização Parcial de Status: PATCH /orders/:id
ordersRouter.patch('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    res.status(400).json({ error: "O campo status é obrigatório para esta atualização." });
    return;
  }

  res.status(200).json({
    message: `Pedido ${id} atualizado com sucesso.`,
    id,
    status
  });
});

// 3. Cancelamento/Exclusão: DELETE /orders/:id
ordersRouter.delete('/:id', (req: Request, res: Response) => {
  // Resposta semântica: 204 No Content para exclusões com sucesso
  res.status(204).send();
});