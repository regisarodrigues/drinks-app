<script setup>
import { RouterView } from 'vue-router';
import HeaderComponent from './components/HeaderComponent.vue';
import MensagemComponent from './components/MensagemComponent.vue';
import ModalComponent from './components/ModalComponent.vue';
</script>

<template>
  <HeaderComponent />
  <main class="container mx-auto mt-10">
    <RouterView />
  </main>
  <ModalComponent />
  <MensagemComponent />
</template>
