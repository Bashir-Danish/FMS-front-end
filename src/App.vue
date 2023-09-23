<script setup lang="ts">
import { RouterView } from "vue-router";
import { mainStore } from '@/stores/main';
import Notification from "@/components/Notification.vue";

const useMain = mainStore();
</script>


<template>
  <div class="app">
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

  &::before,
  &::after {
    content: "";
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    z-index: -1;
  }

  &::before {
    left: 15%;
    top: 15%;
    width: 23vw;
    height: 23vw;
    background: rgba(50, 149, 255, 0.822);
    animation: moveBefore 4s linear infinite alternate;
  }

  &::after {
    right: 15%;
    bottom: 5%;
    width: 10vw;
    height: 10vw;
    background: rgba(49, 149, 255, 0.822);
    animation: moveAfter 4s linear infinite alternate;
  }

  @keyframes moveBefore {
    0% {
      transform: translate(-170, -170);
    }
    100% {
      transform: translate(150px, 150px);
    }
  }

  @keyframes moveAfter {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(150px, -155px);
    }
  }
}
// .app {
//   position: relative;
//   width: 100vw;
//   height: 100vh;
//   min-height: 100vh;
//   overflow: hidden;
//   background: linear-gradient(to bottom, #fafbff, #e6f2ff5b);
//   position: relative;
//   font-family: 'Lexend';
//   color: $dOp-7;

//   &::before {
//     content: "";
//     position: fixed;
//     left: 15%;
//     top: 15%;
//     width: 23vw;
//     height: 23vw;
//     border-radius: 50%;
//     // background:rgba(211, 232, 255, 0.822);
//     // background: rgba(103, 176, 253, 0.822);
//     background: rgba(50, 149, 255, 0.822);
//     filter: blur(70px);
//     z-index: -1;
//   }

//   &::after {
//     content: "";
//     position: fixed;
//     right: 15%;
//     bottom: 5%;
//     width: 10vw;
//     height: 10vw;
//     border-radius: 50%;
//     background: rgba(49, 149, 255, 0.822);
//     filter: blur(70px);
//     z-index: -1;
//   }
// }

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
