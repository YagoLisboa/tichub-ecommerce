import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';

export const categoryRouter = Router();
categoryRouter.get('/', CategoryController.getAll);
categoryRouter.post('/', CategoryController.create);
categoryRouter.delete('/:id', CategoryController.delete);