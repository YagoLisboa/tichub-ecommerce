<template>
  <div class="bg-white p-8 rounded-xl shadow border border-slate-100 max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold text-slate-800 mb-2">Detalhes do Produto</h2>
    <p class="text-slate-500 mb-4">Exibindo dados do ID dinâmico: <span class="font-bold text-emerald-600">{{ $route.params.id }}</span></p>
    <router-link to="/">
      <Button label="Voltar para a Vitrine" class="p-button-secondary bg-slate-500 text-white px-4 py-2 rounded" />
    </router-link>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';
export default defineComponent({ components: { Button } });
</script>
