import { defineStore } from 'pinia';
import { computed, onMounted, reactive, ref } from 'vue';
import APIService from '../services/APIService';
import { useModalStore } from './modal';

export const useBebidasStore = defineStore('bebidas', () => {
  const modal = useModalStore();
  const categorias = ref([]);
  const busca = reactive({
    nome: '',
    categoria: ''
  });
  const receitas = ref([]);
  const receita = ref({});

  onMounted(async function () {
    const {
      data: { drinks }
    } = await APIService.obterCategoria();

    categorias.value = drinks;
  });

  async function obterReceitas() {
    const {
      data: { drinks }
    } = await APIService.buscarReceitas(busca);
    receitas.value = drinks;
  }

  async function selecionarBebida(id) {
    const {
      data: { drinks }
    } = await APIService.buscarReceita(id);
    receita.value = drinks[0];

    modal.handleClickModal();
  }

  const naoTemReceitas = computed(() => receitas.value.length === 0);

  return {
    categorias,
    busca,
    obterReceitas,
    receitas,
    selecionarBebida,
    receita,
    naoTemReceitas
  };
});
