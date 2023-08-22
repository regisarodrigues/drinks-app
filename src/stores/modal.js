import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useBebidasStore } from './bebidas';
import { useFavoritosStore } from './favoritos';

export const useModalStore = defineStore('modal', () => {
  const favoritos = useFavoritosStore();
  const bebidas = useBebidasStore();
  const modal = ref(false);

  function handleClickModal() {
    modal.value = !modal.value;
  }

  const textoButton = computed(() => {
    return favoritos.existeFavorito(bebidas.receita.idDrink)
      ? 'Remover Favorito'
      : 'Adicionar Favoritos';
  });

  return {
    modal,
    handleClickModal,
    textoButton
  };
});
