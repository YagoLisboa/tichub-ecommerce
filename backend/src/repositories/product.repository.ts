import { Product } from '../entities/product.entity';

export class ProductRepository {
  private products: Product[] = [];

  async createProduct(product: Product): Promise<Product> {
    this.products.push(product);
    return product;
  }

  async getAllProducts(page: number, size: number): Promise<Product[]> {
    // Simulação de LIMIT e OFFSET
    const offset = (page - 1) * size;
    return this.products.slice(offset, offset + size);
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.products.find(c => c.id === id) || null;
  }

  async updateProduct(product: Product): Promise<Product> {
    const index = this.products.findIndex(c => c.id === product.id);
    if (index !== -1) this.products[index] = product;
    return product;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const initialLength = this.products.length;
    this.products = this.products.filter(c => c.id !== id);
    return this.products.length !== initialLength;
  }
}