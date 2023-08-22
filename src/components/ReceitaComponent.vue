<script setup>
import { useBebidasStore } from '../stores/bebidas';

const bebidas = useBebidasStore();

defineProps({
  receita: {
    type: Object
  }
});
</script>

<template>
  <div class="border shadow-lg">
    <div class="overflow-hidden">
      <img
        class="hover:scale-125 transition-transform hover:rotate-2"
        :src="receita.strDrinkThumb"
        :alt="'Imagen de ' + receita.strDrink"
      />
    </div>
    <div>
      <h2 class="text-2xl truncate font-extrabold">{{ receita.strDrink }}</h2>
      <button
        class="bg-orange-400 hover:bg-orange-600 cursor-pointer mt-5 w-full p-3 font-bold text-white"
        type="button"
        @click="bebidas.selecionarBebida(receita.idDrink)"
      >
        Ver Receita
      </button>
    </div>
  </div>
</template>
