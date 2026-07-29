import crypto from 'crypto';

export class Product {
  // O uso de 'public' diretamente no construtor já cria as propriedades automaticamente na classe
  private constructor(
    public readonly id: string,
    public name: string,
    public price: number,
    public stock: number,
    public categoryId: string,
    public description: string,
    public image: string
  ) {}

  static create(name: string, price: number, stock: number, categoryId: string, description: string, image: string): Product {
    return new Product(crypto.randomUUID(), name, price, stock, categoryId, description, image);
  }
}