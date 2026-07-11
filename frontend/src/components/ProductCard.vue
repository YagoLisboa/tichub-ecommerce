<template>
  <div class="product-card">
    <h3>{{ product.name }}</h3>
    <p>Categoria: {{ product.category.title }}</p>
    <p class="price">R$ {{ product.price.toFixed(2) }}</p>
    <button @click="onAddClick">Adicionar ao Carrinho</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

// Definição local da interface estrita exigida pela Etapa 1 e 2 da Atividade 2
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

<style scoped>
.product-card {
  border: 1px solid #e0e0e0;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.price {
  font-weight: bold;
  color: #2c3e50;
}
button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}
button:hover {
  background-color: #35495e;
}
</style>
