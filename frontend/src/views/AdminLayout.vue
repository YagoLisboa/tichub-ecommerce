<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 flex">
    <!-- Menu Lateral Admin -->
    <aside class="w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col gap-6">
      <div class="text-lg font-black tracking-wider text-emerald-400">🛡️ TECHHUB ADMIN</div>
      <nav class="flex flex-col gap-2">
        <router-link to="/admin" class="px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
          Dashboard
        </router-link>
        <router-link to="/" class="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 transition-colors mt-auto">
          Voltar para Loja
        </router-link>
      </nav>
    </aside>

    <!-- Painel de Conteúdo -->
    <main class="flex-1 p-8 overflow-y-auto">
      <router-view />
    </main>
  </div>
</template>
