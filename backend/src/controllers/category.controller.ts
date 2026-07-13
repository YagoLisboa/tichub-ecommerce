import { Request, Response } from 'express';
import { createCategorySchema, categoryParamsSchema, categoryQueryPaginationSchema } from '../schemas/category.schema';

export class CategoryController {
  
  static async getAll(req: Request, res: Response): Promise<void> {
    // Paginação Segura validada pelo Zod
    const queryParsed = categoryQueryPaginationSchema.safeParse(req.query);
    if (!queryParsed.success) {
      res.status(400).json({ errors: queryParsed.error.format() });
      return;
    }
    
    const { page, size } = queryParsed.data;
    res.status(200).json({
      message: "Categorias listadas com sucesso (Simulado)",
      page,
      size,
      data: []
    });
  }

  static async create(req: Request, res: Response): Promise<void> {
    const bodyParsed = createCategorySchema.safeParse(req.body);
    
    // Se o cliente enviar um nome com apenas 2 letras, o Zod barra aqui!
    if (!bodyParsed.success) {
      res.status(400).json({ errors: bodyParsed.error.flatten().fieldErrors });
      return;
    }

    res.status(201).json({
      message: "Categoria criada com sucesso!",
      data: { id: crypto.randomUUID(), ...bodyParsed.data }
    });
  }

  static async delete(req: Request, res: Response): Promise<void> {
    const paramsParsed = categoryParamsSchema.safeParse(req.params);
    if (!paramsParsed.success) {
      res.status(400).json({ errors: paramsParsed.error.flatten().fieldErrors });
      return;
    }

    res.status(204).send();
  }
}