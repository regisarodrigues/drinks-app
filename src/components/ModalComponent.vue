<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { useBebidasStore } from '../stores/bebidas';
import { useFavoritosStore } from '../stores/favoritos';
import { useModalStore } from '../stores/modal';

const modal = useModalStore();
const bebidas = useBebidasStore();
const favoritos = useFavoritosStore();

const formatarIngredientes = () => {
  const ingredientesDiv = document.createElement('div');
  for (let i = 0; i <= 15; i++) {
    if (bebidas.receita[`strIngredient${i}`]) {
      const ingrediente = bebidas.receita[`strIngredient${i}`];
      const quantidade = bebidas.receita[`strMeasure${i}`];

      const ingredianteQuantidade = document.createElement('p');
      ingredianteQuantidade.classList.add('text-lg', 'text-gray-500');
      ingredianteQuantidade.textContent = `${ingrediente} - ${quantidade}`;

      ingredientesDiv.appendChild(ingredianteQuantidade);
    }
  }
  return ingredientesDiv;
};
</script>

<template>
  <TransitionRoot as="template" :show="modal.modal">
    <Dialog as="div" class="relative z-10" @close="modal.handleClickModal()">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6"
            >
              <div>
                <div class="mt-3">
                  <DialogTitle as="h3" class="text-gray-900 text-4xl font-extrabold my-5">
                    {{ bebidas.receita.strDrink }}
                  </DialogTitle>
                  <img
                    class="mx-auto w-96"
                    :src="bebidas.receita.strDrinkThumb"
                    :alt="'Imagen de ' + bebidas.receita.strDrink"
                  />
                  <DialogTitle as="h3" class="text-gray-900 text-4xl font-extrabold my-5">
                    Ingredientes e Quantidades
                  </DialogTitle>

                  <div v-html="formatarIngredientes().outerHTML"></div>

                  <DialogTitle as="h3" class="text-gray-900 text-4xl font-extrabold my-5">
                    Instruções
                  </DialogTitle>

                  <p class="text-lg text-gray-500">{{ bebidas.receita.strInstructions }}</p>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 flex justify-between gap-4">
                <button
                  class="w-full rounded bg-gray-500 p-3 font-bold uppercase text-white shadow hover:bg-gray-600"
                  @click="modal.handleClickModal()"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  class="w-full rounded bg-orange-500 p-3 font-bold uppercase text-white shadow hover:bg-orange-600"
                  @click="favoritos.handleClickFavorito()"
                >
                  {{ modal.textoButton }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
