<template>
  <!-- Layout em Grid Principal: Vitrine à Esquerda, Resumo à Direita -->
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">

    <!-- Vitrine de Produtos (Ocupa 3 colunas em telas grandes) -->
    <main class="lg:col-span-3">
      <h2 class="text-xl font-bold text-slate-800 mb-4">Produtos em Destaque</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <!-- Loop renderizando os cards de produto -->
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="handleAddToCart"
        />
      </div>
      <!-- CONTROLES DE PAGINAÇÃO AQUI -->
        <div class="flex justify-center items-center gap-6 mt-10 mb-4">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-5 py-2.5 rounded-lg font-bold transition-all duration-200"
            :class="currentPage === 1 ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md hover:shadow-lg hover:-translate-y-0.5'"
          >
            Anterior
          </button>

          <span class="text-slate-700 font-bold bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100">
            Página {{ currentPage }}
          </span>

          <button
            @click="nextPage"
            :disabled="!hasMore"
            class="px-5 py-2.5 rounded-lg font-bold transition-all duration-200"
            :class="!hasMore ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md hover:shadow-lg hover:-translate-y-0.5'"
          >
            Próxima
          </button>
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
            <!-- Linha Superior: Miniatura, Título e Preço -->
            <div class="flex items-center gap-3">
              <!-- Miniatura da Imagem Real do Produto -->
              <div class="w-12 h-12 bg-white rounded-md border border-slate-200 flex-shrink-0 flex items-center justify-center p-1 shadow-sm">
                <img :src="item.product.image" :alt="item.product.name" class="max-h-full max-w-full object-contain" />
              </div>
            </div>
            <div class="flex justify-between text-sm font-medium text-slate-700">
              <!-- Link dinâmico levando para a página de detalhes da Atividade 4 -->
              <router-link :to="'/product/' + item.product.id" class="hover:text-emerald-600 underline transition-colors">
                {{ item.product.name }}
              </router-link>
              <span>R$ {{ (item.product.price * item.quantity).toFixed(2) }}</span>
            </div>
            <div class="text-xs text-slate-400">
              Qtd: <span class="font-bold text-slate-600">{{ item.quantity }}</span>
            </div>
            <!-- Controles de Quantidade -->
            <div class="flex items-center justify-between">
              <div class="flex items-center border border-slate-200 rounded bg-slate-50">
                <button @click="decreaseQuantity(item.product.id)" class="px-2 py-1 text-slate-500 hover:bg-slate-200 transition-colors">-</button>
                <span class="px-3 text-xs font-bold text-slate-700">{{ item.quantity }}</span>
                <button @click="increaseQuantity(item.product.id)" class="px-2 py-1 text-slate-500 hover:bg-slate-200 transition-colors">+</button>
              </div>
              <button @click="removeProduct(item.product.id)" class="text-xs text-red-500 hover:text-red-700 font-medium ml-auto">
                Remover
              </button>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import { Cart, type CartItem } from '../models/cart.model';
import axios from 'axios';

interface ProductAPI {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: {
    id: string;
    name: string;
  }
}

export default defineComponent({
  name: 'HomeView',
  components: { ProductCard },
  data() {
    return {
      cartInstance: new Cart(),
      cartItems: [] as CartItem[],
      products: [] as ProductAPI[],
      // Novas variáveis de Paginação
      currentPage: 1,
      pageSize: 9, // Vamos exibir 9 produtos por vez (3 linhas de 3)
      hasMore: true // Controla se o botão "Próxima" deve ficar ativo
    };
  },
  async mounted() {
    // Quando a tela carregar, busca os dados da nossa API Real!
    try {
      // Ajuste a rota '/products' conforme está configurado no seu router do backend
      const response = await axios.get('http://localhost:3000/products');
      this.products = response.data;
    } catch (error) {
      console.error("Erro ao buscar produtos da API:", error);
    }
    // Agora chamamos o novo método centralizado
    await this.fetchProducts();
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
    // NOVO: Método que busca produtos passando os parâmetros de paginação
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/products', {
          params: {
            page: this.currentPage,
            size: this.pageSize
          }
        });
        this.products = response.data;

        // Se a API retornou menos produtos do que o tamanho da página,
        // significa que chegamos na última página
        this.hasMore = this.products.length === this.pageSize;
      } catch (error) {
        console.error("Erro ao buscar produtos da API:", error);
      }
    },

    // NOVO: Navega para a próxima página
    async nextPage() {
      if (this.hasMore) {
        this.currentPage++;
        await this.fetchProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola a tela pro topo suavemente
      }
    },

    // NOVO: Volta para a página anterior
    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        await this.fetchProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    handleAddToCart(product: ProductAPI): void {
      this.cartInstance.addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: { id: product.category.id, title: product.category.name }
      }, 1);
      this.cartItems = this.cartInstance.getItems();
    },
    // Novos métodos de controle
    increaseQuantity(productId: string): void {
      this.cartInstance.increaseItem(productId);
      this.cartItems = this.cartInstance.getItems(); // Força a reatividade
    },
    decreaseQuantity(productId: string): void {
      this.cartInstance.decreaseItem(productId);
      this.cartItems = this.cartInstance.getItems();
    },
    removeProduct(productId: string): void {
      this.cartInstance.removeItem(productId);
      this.cartItems = this.cartInstance.getItems();
    }
  }
});
</script>
