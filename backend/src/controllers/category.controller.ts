import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../services/category.service';
import { categoryQueryPaginationSchema, createCategorySchema, categoryParamsSchema } from '../schemas/category.schema';

export class CategoryController {
  // Injeção via construtor
  constructor(private categoryService: CategoryService) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, size } = categoryQueryPaginationSchema.parse(req.query);
      const categories = await this.categoryService.getAll(page, size);
      res.json(categories);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = createCategorySchema.parse(req.body);
      const category = await this.categoryService.create(name);
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  };

  // ------------------------------------------------------------------------
  // NOVOS MÉTODOS IMPLEMENTADOS ABAIXO
  // ------------------------------------------------------------------------

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Valida se o ID passado na URL é um UUID válido
      const { id } = categoryParamsSchema.parse(req.params);
      
      // 2. Valida se o corpo da requisição contém os dados corretos (novo nome)
      // Reaproveitamos o createCategorySchema, pois a regra de validação do nome é a mesma
      const { name } = createCategorySchema.parse(req.body);
      
      // 3. Orquestra a chamada ao Service
      const updatedCategory = await this.categoryService.update(id, name);
      
      // 4. Retorna a entidade atualizada com status 200 (OK)
      res.status(200).json(updatedCategory);
    } catch (error) {
      // Qualquer erro do Zod ou do Service (como "NOT_FOUND") cai aqui e vai para o Middleware Global
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Valida se o ID passado na URL é autêntico antes de bater no banco
      const { id } = categoryParamsSchema.parse(req.params);
      
      // 2. Chama o Service para exclusão (lançará erro se não existir)
      await this.categoryService.delete(id);
      
      // 3. Retorna 204 No Content, a resposta HTTP semanticamente correta para exclusões
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}