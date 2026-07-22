import { z } from 'zod';

export const productParamsSchema = z.object({
  id: z.string().uuid({
    message: 'O ID do produto deve ser um UUID válido.',
  }),
});

export const productQueryPaginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  size: z.coerce.number().int().positive().default(10),
});

export const createProductSchema = z.object({
  name: z
    .string()
    .min(3, 'O nome do produto deve possuir ao menos 3 caracteres.'),

  price: z
    .number()
    .positive('O preço deve ser maior que zero.'),

  stock: z
    .number()
    .int()
    .nonnegative('O estoque não pode ser negativo.'),

  categoryId: z.string().uuid({
    message: 'Categoria inválida.',
  }),
});

export const updateProductSchema = createProductSchema;