<template>
  <div class="max-w-6xl mx-auto py-8 px-4">
    <!-- Botão de Voltar -->
    <router-link to="/" class="inline-flex items-center text-slate-500 hover:text-emerald-600 font-medium mb-8 transition-colors">
      <i class="pi pi-arrow-left mr-2"></i> Voltar para a vitrine
    </router-link>

    <!-- Estado de Carregamento -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <i class="pi pi-spin pi-spinner text-4xl text-emerald-500"></i>
    </div>

    <!-- Layout de Detalhes -->
    <div v-else-if="product" class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row">
      <!-- Lado Esquerdo: Imagem Gigante -->
      <div class="md:w-1/2 p-12 bg-white flex justify-center items-center border-b md:border-b-0 md:border-r border-slate-100">
        <img :src="product.image" :alt="product.name" class="max-h-96 object-contain hover:scale-105 transition-transform duration-500" />
      </div>

      <!-- Lado Direito: Informações -->
      <div class="md:w-1/2 p-8 md:p-12 flex flex-col">
        <span class="inline-block bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full w-fit uppercase tracking-wider font-bold mb-4">
          {{ product.category.name }}
        </span>

        <h1 class="text-3xl font-bold text-slate-800 mb-4 leading-tight">
          {{ product.name }}
        </h1>

        <p class="text-slate-500 text-lg mb-8 leading-relaxed">
          {{ product.description }}
        </p>

        <div class="mt-auto border-t border-slate-100 pt-8">
          <div class="flex items-center justify-between mb-6">
            <span class="text-4xl font-extrabold text-emerald-600">
              R$ {{ product.price.toFixed(2) }}
            </span>
            <span class="text-sm font-medium text-slate-400">
              Estoque: {{ product.stock }} unidades
            </span>
          </div>

          <button @click="addToCart" class="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-emerald-200 transition-all active:scale-95 flex justify-center items-center gap-3">
            <i class="pi pi-shopping-cart text-xl"></i>
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>

    <!-- Produto Não Encontrado -->
    <div v-else class="text-center py-20 text-slate-500">
      <h2 class="text-2xl font-bold mb-2">Produto não encontrado 😕</h2>
      <p>O item que você tentou acessar não existe no banco de dados.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { Cart } from '../models/cart.model';

interface ProductAPI {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  category: {
    id: string;
    name: string;
  }
}

export default defineComponent({
  name: 'ProductDetailView',
  data() {
    return {
      product: null as ProductAPI | null,
      loading: true,
      cartInstance: new Cart()
    };
  },
  async mounted() {
    // Pega o ID da URL atual e busca na API do backend
    const productId = this.$route.params.id;
    try {
      const response = await axios.get(`http://localhost:3000/products/${productId}`);
      this.product = response.data;
    } catch (error) {
      console.error("Erro ao carregar os detalhes do produto", error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    addToCart() {
      if (this.product) {
        this.cartInstance.addItem({
          id: this.product.id,
          name: this.product.name,
          price: this.product.price,
          image: this.product.image,
          category: { id: this.product.category.id, title: this.product.category.name }
        }, 1);
        // Opcional: Aqui você pode disparar um 'toast' avisando que foi adicionado!
        alert(`O produto ${this.product.name} foi adicionado ao carrinho!`);
      }
    }
  }
});
</script>
