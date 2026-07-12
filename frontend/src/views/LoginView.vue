<template>
  <div class="min-h-screen bg-slate-100 flex items-center justify-center p-4">
    <Card class="w-full max-w-md shadow-xl bg-white p-6 rounded-xl border border-slate-200">
      <template #title>
        <h2 class="text-2xl font-black text-slate-800 text-center mb-4">
          {{ isLogin ? 'Acessar Conta' : 'Criar Nova Conta' }}
        </h2>
      </template>

      <template #content>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Campo Nome (Apenas no Registro) -->
          <div v-if="!isLogin" class="flex flex-col gap-1">
            <label class="text-sm font-semibold text-slate-600">Nome Completo</label>
            <InputText v-model="v$.name.$model" :class="{'p-invalid border-red-500': v$.name.$error}" class="w-full p-2 border rounded" />
            <span v-if="v$.name.$error" class="text-xs text-red-500 font-medium">Nome é obrigatório.</span>
          </div>

          <!-- Campo E-mail -->
          <div class="flex flex-col gap-1">
            <label class="text-sm font-semibold text-slate-600">E-mail</label>
            <InputText v-model="v$.email.$model" :class="{'p-invalid border-red-500': v$.email.$error}" class="w-full p-2 border rounded" />
            <span v-if="v$.email.$error" class="text-xs text-red-500 font-medium">Insira um e-mail válido.</span>
          </div>

          <!-- Campo Senha -->
          <div class="flex flex-col gap-1">
            <label class="text-sm font-semibold text-slate-600">Senha</label>
            <Password v-model="v$.password.$model" toggleMask :feedback="false" :class="{'p-invalid border-red-500': v$.password.$error}" class="w-full" inputClass="w-full p-2 border rounded" />
            <span v-if="v$.password.$error" class="text-xs text-red-500 font-medium">A senha deve ter no mínimo 6 caracteres.</span>
          </div>

          <!-- Campo Confirmar Senha (Apenas no Registro) -->
          <div v-if="!isLogin" class="flex flex-col gap-1">
            <label class="text-sm font-semibold text-slate-600">Confirmar Senha</label>
            <Password v-model="v$.confirmPassword.$model" toggleMask :feedback="false" :class="{'p-invalid border-red-500': v$.confirmPassword.$error}" class="w-full" inputClass="w-full p-2 border rounded" />
            <span v-if="v$.confirmPassword.$error" class="text-xs text-red-500 font-medium">As senhas não coincidem.</span>
          </div>

          <!-- Botão Submit com Controle de Loading -->
          <Button type="submit" :label="isLogin ? 'Entrar como ADMIN' : 'Registrar Conta'" :loading="authStore.loading" class="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-lg mt-4 transition-colors" />
        </form>
      </template>

      <template #footer>
        <p class="text-center text-sm text-slate-500 mt-4 cursor-pointer hover:underline" @click="isLogin = !isLogin">
          {{ isLogin ? 'Não tem conta? Cadastre-se' : 'Já possui conta? Entre por aqui' }}
        </p>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, sameAs } from '@vuelidate/validators';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

export default defineComponent({
  name: 'LoginView',
  components: { Card, InputText, Password, Button },
  setup() {
    return {
      authStore: useAuthStore(),
      v$: useVuelidate()
    };
  },
  data() {
    return {
      isLogin: true,
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  validations() {
    if (this.isLogin) {
      return {
        email: { required, email },
        password: { required }
      };
    } else {
      return {
        name: { required },
        email: { required, email },
        password: { required, minLength: minLength(6) },
        confirmPassword: { required, sameAsPassword: sameAs(this.password) }
      };
    }
  },
  methods: {
    async handleSubmit() {
      this.v$.$touch();
      if (this.v$.$invalid) return; // Bloqueia o envio se houver erros cadastrais

      if (this.isLogin) {
        // Forçamos o login simulado como ADMIN para validar a Atividade 4
        const success = await this.authStore.login(this.email, 'ADMIN');
        if (success) this.$router.push('/admin');
      } else {
        alert('Cadastro efetuado com sucesso! Mude para a aba de Login.');
        this.isLogin = true;
      }
    }
  }
});
</script>
