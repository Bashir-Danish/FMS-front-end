<template>
    <div v-if="useMain.errorMessage.message" class="notification">
      <div class="content">
        <div class="notification-title">{{ useMain.errorMessage.title }}</div>
        <div class="notification-text">{{ useMain.errorMessage.message }}</div>
        <button @click="dismissNotification" class="dismiss">
          <Icon size="18">
            <Dismiss20Regular />
          </Icon>
        </button>
      </div>
      <div class="progress-bar" :style="progressBarStyles">
      </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { mainStore } from '@/stores/main';
import { Icon } from "@vicons/utils";
import {
  Dismiss20Regular
} from "@vicons/fluent";

const useMain = mainStore();
const progressBarWidth = ref(95);

const dismissNotification = () => {
  useMain.errorMessage.title = '';
  useMain.errorMessage.message = '';
  progressBarWidth.value = 95;
};

const progressBarStyles = computed(() => {
  return {
    width: `${progressBarWidth.value}%`,
    'background-color': `${useMain.errorMessage.success ? '#53ff1f' :'#ff4b45'}`
  };
});

onMounted(() => {
  const animationDuration = 3000; 
  const interval = 50; 
  const steps = animationDuration / interval;
  const stepSize = 100 / steps;

  const progressBarInterval = setInterval(() => {
    progressBarWidth.value -= stepSize;
    if (progressBarWidth.value <= 0) {
      clearInterval(progressBarInterval);
      dismissNotification();
    }
  }, interval);
});

</script>

  
<style lang="scss" scoped>
@import "@/assets/variables.scss";

.notification {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  width: 20rem;
  max-height: 6rem;
  overflow-y: auto;
  background-color: #fbfffa;
  box-shadow: 0 2px 3px 0 rgba(31, 38, 135, 0.37),
  0 -1px 3px 0 rgba(116, 119, 156, 0.085);
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  border-radius: 10px;
  direction: rtl;
  display: flex;
  flex-direction: column;
  z-index: 100000;
  .content{
    padding: 10px 25px;
  }
  .notification-title {
    font-weight: bold;
    width: 100%;
  }

  .dismiss {
    position: fixed;
    width: 1.5rem;
    height: 1.5rem;
    top: 0;
    right: 0;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;

    &:hover {
      color: $red;
    }
  }
}



.progress-bar {
  height: 3px;
  transition: width 10ms linear;
  position: absolute;
  bottom: 0;
  border-radius: 5px;
  margin: 0 .5rem;
}
</style>
  