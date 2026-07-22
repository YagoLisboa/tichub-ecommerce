import { Category } from '../entities/category.entity';

export class CategoryRepository {
  private categories: Category[] = [];

  async createCategory(category: Category): Promise<Category> {
    this.categories.push(category);
    return category;
  }

  async getAllCategories(page: number, size: number): Promise<Category[]> {
    // Simulação de LIMIT e OFFSET
    const offset = (page - 1) * size;
    return this.categories.slice(offset, offset + size);
  }

  async getCategoryById(id: string): Promise<Category | null> {
    return this.categories.find(c => c.id === id) || null;
  }

  async updateCategory(category: Category): Promise<Category> {
    const index = this.categories.findIndex(c => c.id === category.id);
    if (index !== -1) this.categories[index] = category;
    return category;
  }

  async deleteCategory(id: string): Promise<boolean> {
    const initialLength = this.categories.length;
    this.categories = this.categories.filter(c => c.id !== id);
    return this.categories.length !== initialLength;
  }
}