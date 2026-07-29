import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import Database from 'better-sqlite3';
import { Product } from '../entities/product.entity.js';

// Usando a diretiva Sênior para lidar com o conflito de tipos de terceiros
//// @ts-expect-error - Tipagem do PrismaAdapter conflita temporariamente com o better-sqlite3
const adapter = new PrismaBetterSqlite3({
  url: 'file:./dev.db'
});

// 3. Inicialização
const prisma = new PrismaClient({ adapter });

export class ProductRepository {
  
  async createProduct(product: Product) {
    return await prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        categoryId: product.categoryId,
        description: product.description,
        image: product.image
      }
    });
  }

  async getAllProducts(page: number, size: number) {
    const offset = (page - 1) * size;
    return await prisma.product.findMany({
      skip: offset,
      take: size,
      include: {
        category: true 
      }
    });
  }

  async getProductById(id: string): Promise<Product | null> {
    return await prisma.product.findUnique({
      where: { id },
      include: { category: true } // Traz o JOIN com a categoria
    });
  }

  async updateProduct(product: Product) {
    return await prisma.product.update({
      where: { id: product.id },
      data: {
        name: product.name,
        price: product.price,
        stock: product.stock,
        categoryId: product.categoryId,
        description: product.description,
        image: product.image
      }
    });
  }

  async deleteProduct(id: string): Promise<void> {
    await prisma.product.delete({
      where: { id }
    });
  }
}