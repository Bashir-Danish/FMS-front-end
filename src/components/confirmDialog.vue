<template>
    <div class="confirm-dialog">
      <div class="title">{{ title }}</div>
      <div class="message">{{ message }}</div>
      <div class="buttons">
        <button @click="onConfirm">Confirm</button>
        <button @click="useMain.closeConfirmDialog">Cancel</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue';
  import { mainStore } from '@/stores/main';
  
  const useMain = mainStore();
  

  const props = defineProps(['title', 'message', 'onConfirmCallback']);
  const emit = defineEmits();

const onConfirm = () => {
  if (props.onConfirmCallback) {
    console.log(props.onConfirmCallback)
    // props.onConfirmCallback(); // Use the callback directly from props
  }
  emit('confirm');
};
  onMounted(() => {});
  </script>
  
  <style scoped lang="scss">
  .confirm-dialog {
    position: absolute;
    background-color: rgb(27, 27, 27);
    color: aliceblue;
    z-index: 10000;
    width: 10rem;
    height: 10rem;
    top: 0;
    right: 0;
  }
  </style>
  