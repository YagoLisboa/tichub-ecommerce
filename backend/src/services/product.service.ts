import { ProductRepository } from '../repositories/product.repository';
import { CategoryRepository } from '../repositories/category.repository';
import { Product } from '../entities/product.entity';

export class ProductService {
  // Injetando as duas dependências diretamente pelo construtor (Padrão Sênior)
  constructor(
    private productRepository: ProductRepository,
    private categoryRepository: CategoryRepository
  ) {}

  async getAll(page: number, size: number) {
    return this.productRepository.getAllProducts(page, size);
  }

  async getById(id: string) {
    const product = await this.productRepository.getProductById(id);
    if (!product) throw new Error("NOT_FOUND");
    return product;
  }

  async create(name: string, price: number, stock: number, categoryId: string) {
    // 1. Validação cruzada: A categoria fornecida realmente existe no repositório?[cite: 1]
    const categoryExists = await this.categoryRepository.getCategoryById(categoryId);
    
    if (!categoryExists) {
      // Se não existir, abortamos a operação lançando um erro que será capturado pelo ErrorMiddleware
      throw new Error("CATEGORY_NOT_FOUND");
    }

    // 2. Construção segura via Factory da Entidade[cite: 1]
    const newProduct = Product.create(name, price, stock, categoryId);
    
    // 3. Persistência
    return this.productRepository.createProduct(newProduct);
  }

  async update(id: string, name: string, price: number, stock: number, categoryId: string) {
    // 1. Verifica se o produto alvo existe[cite: 1]
    const product = await this.productRepository.getProductById(id);
    if (!product) throw new Error("NOT_FOUND");

    // 2. Verifica se a categoria foi alterada em relação ao registro atual[cite: 1]
    if (product.categoryId !== categoryId) {
      // 3. Caso tenha sido alterada, valida se a nova categoria existe[cite: 1]
      const categoryExists = await this.categoryRepository.getCategoryById(categoryId);
      if (!categoryExists) {
        throw new Error("CATEGORY_NOT_FOUND");
      }
    }

    // 4. Atualiza as propriedades (o ideal é ter um método update() dentro da Entity, 
    // mas a atribuição direta resolve para objetos mutáveis simples)
    product.name = name;
    product.price = price;
    product.stock = stock;
    product.categoryId = categoryId;

    // 5. Persistência do objeto modificado
    return this.productRepository.updateProduct(product);
  }

  async delete(id: string): Promise<void> {
  const product = await this.productRepository.getProductById(id);

  if (!product) {
    throw new Error('NOT_FOUND');
  }

  await this.productRepository.deleteProduct(id);
  }
}