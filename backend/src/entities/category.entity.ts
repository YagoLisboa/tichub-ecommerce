import crypto from 'crypto';

export class Category {
  private constructor(public readonly id: string, public name: string) {}

  // Factory method exigido pela arquitetura
  static create(name: string): Category {
    return new Category(crypto.randomUUID(), name);
  }

  // Método de domínio para atualização
  rename(newName: string): void {
    if (!newName.trim()) throw new Error("O nome da categoria não pode ser vazio.");
    this.name = newName;
  }
}