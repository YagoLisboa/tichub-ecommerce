import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';

export const productsRouter = Router();
productsRouter.get('/', ProductController.getAll);
productsRouter.post('/', ProductController.create);
productsRouter.delete('/:id', ProductController.delete);