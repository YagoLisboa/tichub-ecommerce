<template>
  <div id="app-container">
    <h1>🛒 TechHub E-commerce</h1>

    <!-- Vitrine de Produtos -->
    <section class="showcase">
      <h2>Produtos Disponíveis</h2>
      <div class="product-grid">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="handleAddToCart"
        />
      </div>
    </section>

    <!-- Resumo e Listagem do Carrinho -->
    <section class="cart-summary">
      <h2>Resumo do Carrinho</h2>

      <div v-if="cartItems.length === 0" class="empty-message">
        O seu carrinho está vazio.
      </div>

      <div v-else>
        <!-- Listagem Detalhada (Desafio) -->
        <ul class="cart-list">
          <li v-for="item in cartItems" :key="item.product.id">
            <span>{{ item.product.name }} x {{ item.quantity }}</span>
            <span class="subtotal">R$ {{ (item.product.price * item.quantity).toFixed(2) }}</span>
          </li>
        </ul>

        <div class="totals">
          <p><strong>Total de itens:</strong> {{ totalItems }} unidades</p>
          <p><strong>Preço Final:</strong> R$ {{ finalPrice.toFixed(2) }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductCard from './components/ProductCard.vue';
import { Cart, type CartItem } from './models/cart.model';
import { Product } from './models/product.model';

export default defineComponent({
  name: 'App',
  components: { ProductCard },
  data() {
    return {
      // Instanciando a Model Rica (Arquitetura Pro)
      cartInstance: new Cart(),
      // Array auxiliar para forçar a reatividade fina do Vue 3 ao modificar objetos internos de classes
      cartItems: [] as CartItem[],

      // Dados Fictícios Rigorosamente Tipados
      products: [
        { id: '1', name: 'Teclado Mecânico RGB', price: 349.90, category: { id: 'c1', title: 'Periféricos' } },
        { id: '2', name: 'Mouse Gamer 16000 DPI', price: 219.00, category: { id: 'c1', title: 'Periféricos' } },
        { id: '3', name: 'Monitor 144Hz 1ms', price: 1299.00, category: { id: 'c2', title: 'Monitores' } }
      ] as any[] // Convertido estruturalmente para coincidir com o contrato exigido pelo card
    };
  },
  computed: {
    totalItems(): number {
      return this.cartInstance.totalItems;
    },
    finalPrice(): number {
      return this.cartInstance.getFinalPrice();
    }
  },
  methods: {
    handleAddToCart(product: any): void {
      // Executa a regra de acúmulo de quantidades encapsulada na classe da Atividade 1
      this.cartInstance.addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        category: { id: product.category.id, title: product.category.title }
      }, 1);

      // Sincroniza a referência para disparar a reatividade do Options API perfeitamente
      this.cartItems = this.cartInstance.getItems();
    }
  }
});
</script>

<style>
#app-container {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}
.cart-summary {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e3e3e3;
}
.cart-list {
  list-style: none;
  padding: 0;
}
.cart-list li {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}
.totals {
  margin-top: 20px;
  font-size: 1.1em;
  text-align: right;
}
</style>
