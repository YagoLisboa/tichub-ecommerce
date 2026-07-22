import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { ProductService } from '../services/product.service';
import { ProductRepository } from '../repositories/product.repository';
import { CategoryRepository } from '../repositories/category.repository';
// Importação obrigatória dos middlewares de segurança para a Atividade 9
import { authMiddleware, authorize } from '../middlewares/auth.middleware';

export const productsRouter = Router();

// 1. Instanciamos AMBOS os repositórios
const categoryRepo = new CategoryRepository();
const productRepo = new ProductRepository();

// 2. Injetamos ambos no Serviço
const productService = new ProductService(productRepo, categoryRepo);

// 3. Injetamos o serviço no Controller
const productController = new ProductController(productService);

// Agrupamento de middlewares para facilitar a reutilização e manter o código limpo
const adminOnly = [authMiddleware, authorize('admin')];

// 4. Mapeamento das rotas públicas (Sem autenticação)
productsRouter.get('/', productController.getAll);

// 5. Mapeamento das rotas protegidas (Exigem token JWT e Role de 'admin')
productsRouter.post('/', adminOnly, productController.create);
productsRouter.put('/:id', adminOnly, productController.update);
productsRouter.delete('/:id', adminOnly, productController.delete);