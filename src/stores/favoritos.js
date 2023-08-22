import { defineStore } from 'pinia';
import { computed, onMounted, ref, watch } from 'vue';
import { useBebidasStore } from './bebidas';
import { useModalStore } from './modal';
import { useNotificacaoStore } from './notificacoes';

export const useFavoritosStore = defineStore('favoritos', () => {
  const bebidas = useBebidasStore();
  const modal = useModalStore();
  const notificacao = useNotificacaoStore();
  const favoritos = ref([]);

  onMounted(() => {
    favoritos.value = JSON.parse(localStorage.getItem('favoritos')) ?? [];
  });

  watch(
    favoritos,
    () => {
      sincronizarLocalStorage();
    },
    {
      deep: true
    }
  );

  function sincronizarLocalStorage() {
    localStorage.setItem('favoritos', JSON.stringify(favoritos.value));
  }

  function existeFavorito() {
    const favoritosLocalStorage = JSON.parse(localStorage.getItem('favoritos')) ?? [];

    return favoritosLocalStorage.some((favorito) => favorito.idDrink === bebidas.receita.idDrink);
  }

  function adicionarFavorito() {
    favoritos.value.push(bebidas.receita);
    notificacao.mostrar = true;
    notificacao.texto = 'Adicionado aos favoritos!';
  }

  function removerFavorito() {
    favoritos.value = favoritos.value.filter(
      (favorito) => favorito.idDrink !== bebidas.receita.idDrink
    );

    notificacao.mostrar = true;
    notificacao.texto = 'Removido dos favoritos!';
  }

  function handleClickFavorito() {
    if (existeFavorito()) {
      removerFavorito();
    } else {
      adicionarFavorito();
    }
    modal.modal = false;
  }

  const naoTemFavorito = computed(() => favoritos.value.length === 0);

  return {
    favoritos,
    handleClickFavorito,
    existeFavorito,
    naoTemFavorito
  };
});
