<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Navbar Premium do Consumidor -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <router-link to="/" class="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>🛒</span> TechHub Commerce
        </router-link>
        <nav class="flex items-center gap-4">
          <router-link to="/" class="text-sm font-medium text-slate-600 hover:text-slate-900">Home</router-link>
          <router-link to="/admin" class="text-sm text-emerald-600 hover:text-emerald-700 font-bold">Painel Admin</router-link>
        </nav>
      </div>
    </header>

    <!-- Conteúdo Dinâmico da Rota -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <router-view />
    </main>
  </div>
</template>
