import { defineStore } from 'pinia';
import { ref, watchEffect } from 'vue';

export const useNotificacaoStore = defineStore('notificacao', () => {
  const texto = ref('');
  const erro = ref(false);
  const mostrar = ref(false);

  // function $reset() {
  //   texto.value = '';
  //   erro.value = false;
  //   mostrar.value = false;
  // }

  watchEffect(() => {
    if (mostrar.value) {
      setTimeout(() => {
        texto.value = '';
        erro.value = false;
        mostrar.value = false;
      }, 3000);
    }
  });

  return {
    texto,
    erro,
    mostrar
  };
});
