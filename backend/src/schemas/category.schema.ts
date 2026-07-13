import { z } from 'zod';

// Validação dos parâmetros de URL para rotas com /:id (exige UUID válido)
export const categoryParamsSchema = z.object({
  id: z.string().uuid({ message: "O ID fornecido deve ser um UUID válido." })
});

// Validação da Query String para Paginação Segura
export const categoryQueryPaginationSchema = z.object({
  page: z.string().optional().transform(val => val ? Math.max(1, parseInt(val, 10)) : 1),
  size: z.string().optional().transform(val => val ? Math.max(1, parseInt(val, 10)) : 10)
});

// Validação do Corpo da Requisição (Criação estrita)
export const createCategorySchema = z.object({
  name: z.string().min(3, { message: "O nome da categoria deve ter no mínimo 3 caracteres." })
});