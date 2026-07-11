import type { IProduct } from './product.model';

export interface CartItem {
  product: IProduct;
  quantity: number;
}

export class Cart {
  private items: CartItem[] = [];

  // Retorna uma cópia imutável dos itens para proteger o estado interno
  getItems(): CartItem[] {
    return [...this.items];
  }

  // Desafio 1: Adiciona item usando .some() para evitar duplicidade
  addItem(product: IProduct, quantity: number): void {
    if (quantity <= 0) return;

    const productExists = this.items.some(item => item.product.id === product.id);

    if (productExists) {
      this.items = this.items.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      this.items.push({ product, quantity });
    }
  }

  // Desafio 2: Retorna a quantidade total de unidades usando .reduce()
  get totalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // Desafio 3: Retorna o valor monetário total da compra usando .reduce()
  getFinalPrice(): number {
    return this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }
}
