<script setup>
import ReceitaComponent from '../components/ReceitaComponent.vue';
import { useBebidasStore } from '../stores/bebidas';

const bebibas = useBebidasStore();
</script>

<template>
  <h1 class="text-6xl font-extrabold">Receitas</h1>

  <p class="my-10 text-center text-2xl" v-if="bebibas.naoTemReceitas">
    Não tem Resultado, utilize o formulário para buscar a receita!
  </p>

  <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10" v-else>
    <ReceitaComponent
      v-for="receita in bebibas.receitas"
      :receita="receita"
      :key="receita.idDrink"
    />
  </div>
</template>
