import crypto from 'crypto';

export class Product {
  private constructor(
    public readonly id: string,
    public name: string,
    public price: number,
    public stock: number,
    public categoryId: string
  ) {}

  static create(name: string, price: number, stock: number, categoryId: string): Product {
    return new Product(crypto.randomUUID(), name, price, stock, categoryId);
  }
}