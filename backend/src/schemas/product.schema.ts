import { z } from 'zod';

export const productParamsSchema = z.object({
  id: z.string().uuid({ message: "O ID do produto deve ser um UUID válido." })
});

// Exige dados completos e amarra o categoryId a um UUID válido
export const createProductSchema = z.object({
  name: z.string().min(3, { message: "O nome do produto deve ter no mínimo 3 caracteres." }),
  price: z.number().positive({ message: "O preço deve ser um número estritamente positivo." }),
  categoryId: z.string().uuid({ message: "O categoryId deve corresponder a um UUID válido." })
});