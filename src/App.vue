<script setup lang="ts">
import { RouterView } from "vue-router";
import { mainStore } from '@/stores/main';
import ConfirmDialog from "./components/confirmDialog.vue";
import Notification from "@/components/Notification.vue";
const useMain = mainStore();

// const handleConfirmDelete = async (confirmed: boolean) => {
//   console.log(confirmed);
  
//   if (confirmed == true ) {
//     try {
//       // await useMain.deleteDepartment(id);
//       // await useMain.getAllDepartments();
//       console.log('yes');
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   // useMain.closeConfirmDialog();
// };
</script>
<template>
  <div class="app">
    <!-- <ConfirmDialog
      v-if="useMain.confirmDialog.showConfirmDialog"
      :title="useMain.confirmDialog.confirmDialogData.title"
      :message="useMain.confirmDialog.confirmDialogData.message"
      :onConfirmCallback="useMain.confirmDialog.confirmDialogData.onConfirmCallback"
    /> -->
    <Transition  name="bounce">
        <Notification v-if="useMain.errorMessage.message" />
    </Transition>
    <RouterView />
  </div>
</template>


<style scoped lang="scss">
@import "@/assets/variables.scss";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  position: relative;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  overflow: hidden;
  background: linear-gradient(to bottom, #fafbff, #e6f2ff5b);
  position: relative;
  font-family: 'Lexend';
  color: $dOp-7;

  &::before {
    content: "";
    position: fixed;
    left: 15%;
    top: 15%;
    width: 23vw;
    height: 23vw;
    border-radius: 50%;
    // background:rgba(211, 232, 255, 0.822);
    background: rgba(103, 176, 253, 0.822);
    filter: blur(70px);
    z-index: -1;
  }

  &::after {
    content: "";
    position: fixed;
    right: 15%;
    bottom: 5%;
    width: 10vw;
    height: 10vw;
    border-radius: 50%;
    background: rgba(49, 149, 255, 0.822);
    filter: blur(70px);
    z-index: -1;
  }
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}
</style>
