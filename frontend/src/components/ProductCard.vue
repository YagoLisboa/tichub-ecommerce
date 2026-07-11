<template>
  <Card class="shadow-lg rounded-xl overflow-hidden border border-slate-100 bg-white flex flex-col h-full">
    <template #title>
      <h3 class="text-lg font-bold text-slate-800 line-clamp-1">{{ product.name }}</h3>
    </template>
    <template #subtitle>
      <span class="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full mt-1">
        {{ product.category.title }}
      </span>
    </template>
    <template #content>
      <p class="text-2xl font-extrabold text-emerald-600 my-3">
        R$ {{ product.price.toFixed(2) }}
      </p>
    </template>
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

interface CategoryFrontend {
  id: string;
  title: string;
}

interface ProductFrontend {
  id: string;
  name: string;
  price: number;
  category: CategoryFrontend;
}

export default defineComponent({
  name: 'ProductCard',
  components: { Card, Button },
  props: {
    product: {
      type: Object as PropType<ProductFrontend>,
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
