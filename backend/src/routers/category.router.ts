import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller.js';
import { CategoryService } from '../services/category.service.js';
import { CategoryRepository } from '../repositories/category.repository.js';
import { authMiddleware, authorize } from '../middlewares/auth.middleware.js';

export const categoryRouter = Router();

// Instanciação manual de dependências (Padrão Sênior)
const repository = new CategoryRepository();
const service = new CategoryService(repository);
const controller = new CategoryController(service);

// Rotas Públicas
categoryRouter.get('/', controller.getAll);

// Rotas Protegidas (Exigem Autenticação e Role Admin)
const adminOnly = [authMiddleware, authorize('admin')];
categoryRouter.post('/', adminOnly, controller.create);
// categoryRouter.put('/:id', adminOnly, controller.update);
// categoryRouter.delete('/:id', adminOnly, controller.delete);