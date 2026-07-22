import { CategoryRepository } from '../repositories/category.repository';
import { Category } from '../entities/category.entity';

export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async getAll(page: number, size: number) {
    return this.categoryRepository.getAllCategories(page, size);
  }

  async getById(id: string) {
    const category = await this.categoryRepository.getCategoryById(id);
    if (!category) throw new Error("NOT_FOUND");
    return category;
  }

  async create(name: string) {
    const newCategory = Category.create(name); // Uso exclusivo da factory
    return this.categoryRepository.createCategory(newCategory);
  }

  async update(id: string, newName: string) {
    const category = await this.categoryRepository.getCategoryById(id);
    if (!category) throw new Error("NOT_FOUND");
    
    category.rename(newName); // Regra de negócio na entidade
    return this.categoryRepository.updateCategory(category);
  }

  async delete(id: string) {
    const category = await this.categoryRepository.getCategoryById(id);
    if (!category) throw new Error("NOT_FOUND");
    await this.categoryRepository.deleteCategory(id);
  }
}