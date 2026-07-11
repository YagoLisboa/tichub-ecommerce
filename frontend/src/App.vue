<template>
  <div class="min-h-screen bg-slate-50 p-4 md:p-8 max-w-7xl mx-auto">
    <header class="mb-8 flex items-center justify-between border-b border-slate-200 pb-4">
      <h1 class="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
        <span>🛒</span> TechHub Hub-Commerce
      </h1>
    </header>

    <!-- Layout em Grid Principal: Vitrine à Esquerda, Resumo à Direita -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">

      <!-- Vitrine de Produtos (Ocupa 3 colunas em telas grandes) -->
      <main class="lg:col-span-3">
        <h2 class="text-xl font-bold text-slate-800 mb-4">Produtos em Destaque</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            @add-to-cart="handleAddToCart"
          />
        </div>
      </main>

      <!-- Resumo do Carrinho (Ocupa 1 coluna) -->
      <aside class="lg:col-span-1 bg-white p-6 rounded-xl shadow-md border border-slate-100 self-start">
        <h2 class="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Meu Carrinho</h2>

        <!-- Estado Vazio (Desafio Empty State) -->
        <div v-if="cartItems.length === 0" class="text-center py-8 text-slate-400">
          <p class="text-4xl mb-2">📥</p>
          <p class="text-sm">Seu carrinho está vazio.</p>
        </div>

        <div v-else>
          <!-- Listagem Detalhada do Carrinho -->
          <ul class="divide-y divide-slate-100 mb-6">
            <li v-for="item in cartItems" :key="item.product.id" class="py-3 flex flex-col gap-1">
              <div class="flex justify-between text-sm font-medium text-slate-700">
                <span>{{ item.product.name }}</span>
                <span>R$ {{ (item.product.price * item.quantity).toFixed(2) }}</span>
              </div>
              <div class="text-xs text-slate-400">
                Qtd: <span class="font-bold text-slate-600">{{ item.quantity }}</span>
              </div>
            </li>
          </ul>

          <!-- Totais Dinâmicos -->
          <div class="bg-slate-50 p-4 rounded-lg space-y-2 border border-slate-100">
            <div class="flex justify-between text-sm text-slate-500">
              <span>Total de itens:</span>
              <span class="font-semibold text-slate-700">{{ totalItems }} un.</span>
            </div>
            <div class="flex justify-between text-base font-bold text-slate-800 pt-2 border-t border-slate-200">
              <span>Preço Final:</span>
              <span class="text-emerald-600">R$ {{ finalPrice.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </aside>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductCard from './components/ProductCard.vue';
import { Cart, type CartItem } from './models/cart.model';

export default defineComponent({
  name: 'App',
  components: { ProductCard },
  data() {
    return {
      cartInstance: new Cart(),
      cartItems: [] as CartItem[],
      products: [
        { id: '1', name: 'Teclado Mecânico RGB', price: 349.90, category: { id: 'c1', title: 'Periféricos' } },
        { id: '2', name: 'Mouse Gamer 16000 DPI', price: 219.00, category: { id: 'c1', title: 'Periféricos' } },
        { id: '3', name: 'Monitor 144Hz 1ms', price: 1299.00, category: { id: 'c2', title: 'Monitores' } }
      ]
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
      this.cartInstance.addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        category: { id: product.category.id, title: product.category.title }
      }, 1);
      this.cartItems = this.cartInstance.getItems();
    }
  }
});
</script>
