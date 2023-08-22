<script setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useBebidasStore } from '../stores/bebidas';
import { useNotificacaoStore } from '../stores/notificacoes';

const route = useRoute();
const store = useBebidasStore();
const notificacao = useNotificacaoStore();

const paginaHome = computed(() => route.name === 'home');

const handleSubmit = () => {
  if (Object.values(store.busca)) {
    notificacao.$patch({
      texto: 'Todos campos são obrigatório!',
      mostrar: true,
      erro: true
    });

    return;
  }
  store.obterReceitas();
};
</script>
<template>
  <header class="bg-slate-800" :class="{ header: paginaHome }">
    <div class="mx-auto container px-5 py-6">
      <div class="flex justify-between items-center">
        <div>
          <RouterLink :to="{ name: 'home' }">
            <img class="w-32" src="/img/logo.svg" alt="logotipo" />
          </RouterLink>
        </div>
        <nav class="text-white flex gap-4">
          <RouterLink
            class="uppercase font-bold"
            active-class="text-orange-500"
            :to="{ name: 'home' }"
          >
            Home
          </RouterLink>
          <RouterLink
            class="uppercase font-bold"
            active-class="text-orange-500"
            :to="{ name: 'favoritos' }"
          >
            Favoritos
          </RouterLink>
        </nav>
      </div>
      <form
        class="bg-orange-400 md:w-1/2 2xl:w-1/3 my-10 p-5 rounded-lg shadow space-y-6"
        @submit.prevent="handleSubmit"
        v-if="paginaHome"
      >
        <div class="space-y-4">
          <label class="block text-white uppercase font-extrabold text-lg" for="ingrediente"
            >Nome ou Ingrediente</label
          >
          <input
            class="p-3 w-full rounded-lg focus:outline-none"
            type="text"
            name="ingrediente"
            id="ingrediente"
            placeholder="Nome ou Ingrediente: ex. Vodka, Tequila, etc"
            v-model="store.busca.nome"
          />
        </div>
        <div class="space-y-4">
          <label class="block text-white uppercase font-extrabold text-lg" for="categoria"
            >Categoria</label
          >
          <select
            class="p-3 w-full rounded-lg focus:outline-none"
            name="categoria"
            id="categoria"
            v-model="store.busca.categoria"
          >
            <option value="">-- Selecione --</option>
            <option
              v-for="categoria in store.categorias"
              :key="categoria.strCategory"
              :value="categoria.strCategory"
            >
              {{ categoria.strCategory }}
            </option>
          </select>
        </div>
        <input
          class="bg-orange-700 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase"
          type="submit"
          value="Buscar Receitas"
        />
      </form>
    </div>
  </header>
</template>

<style>
.header {
  background-image: url('/img/bg.jpg');
  background-size: cover;
  background-position: center;
}
</style>
