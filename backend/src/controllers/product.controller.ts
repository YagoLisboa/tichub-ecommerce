import { Request, Response } from 'express';
import { createProductSchema, productParamsSchema } from '../schemas/product.schema';

export class ProductController {
  
  static async getAll(req: Request, res: Response): Promise<void> {
    const { category } = req.query; // Filtro por query string ?category=UUID
    res.status(200).json({
      message: "Produtos filtrados retornados com sucesso",
      filterCategory: category || "all",
      data: []
    });
  }

  static async create(req: Request, res: Response): Promise<void> {
    const result = createProductSchema.safeParse(req.body);
    
    if (!result.success) {
      res.status(400).json({ errors: result.error.flatten().fieldErrors });
      return;
    }

    res.status(201).json({
      message: "Produto validado e criado!",
      data: { id: crypto.randomUUID(), ...result.data }
    });
  }

  static async delete(req: Request, res: Response): Promise<void> {
    const paramsParsed = productParamsSchema.safeParse(req.params);
    if (!paramsParsed.success) {
      res.status(400).json({ errors: paramsParsed.error.flatten().fieldErrors });
      return;
    }
    res.status(204).send();
  }
}