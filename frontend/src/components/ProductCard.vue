<template>
  <Card class="shadow-lg rounded-xl overflow-hidden border border-slate-100 bg-white flex flex-col h-full">

    <!-- 1. Novo Slot de Header para exibir a imagem real -->
    <template #header>
      <div class="h-48 bg-white p-4 flex justify-center items-center border-b border-slate-100">
        <img
          :src="product.image"
          :alt="product.name"
          class="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>
    </template>

    <!-- 2. Slot de Title ajustado para ocupar até 2 linhas caso o nome seja grande -->
    <template #title>
      <h3 class="text-lg font-bold text-slate-800 line-clamp-2" :title="product.name">
        {{ product.name }}
      </h3>
    </template>

    <!-- 3. Slot de Subtitle com a correção de title para name -->
    <template #subtitle>
      <span class="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full mt-1 uppercase tracking-wider">
        {{ product.category.name }}
      </span>
    </template>

    <template #content>
      <div class="flex flex-col flex-1 h-full">
        <!-- 4. Descrição do produto em até 2 linhas -->
        <p class="text-sm text-slate-500 line-clamp-2 mb-4 flex-1" :title="product.description">
          {{ product.description }}
        </p>

        <!-- Preço mantido com seu estilo original -->
        <p class="text-2xl font-extrabold text-emerald-600 my-1">
          R$ {{ product.price.toFixed(2) }}
        </p>
      </div>
    </template>

    <!-- Slot de Footer mantido com o seu Button do PrimeVue -->
    <template #footer>
      <div class="mt-auto">
        <Button
          label="Adicionar ao Carrinho"
          icon="pi pi-shopping-cart"
          class="w-full p-button-success bg-emerald-500 hover:bg-emerald-600 border-none text-white font-medium py-2.5 rounded-lg transition-colors duration-200"
          @click="onAddClick"
        />
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';

// 5. Interface da Categoria atualizada (name no lugar de title)
interface CategoryAPI {
  id: string;
  name: string;
}

// 6. Interface do Produto atualizada (adicionado description e image)
interface ProductAPI {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: CategoryAPI;
}

export default defineComponent({
  name: 'ProductCard',
  components: { Card, Button },
  props: {
    product: {
      // 7. Usando a nova interface para garantir a tipagem correta
      type: Object as PropType<ProductAPI>,
      required: true
    }
  },
  emits: ['add-to-cart'],
  methods: {
    onAddClick(): void {
      this.$emit('add-to-cart', this.product);
    }
  }
});
</script>
