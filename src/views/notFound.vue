<script setup lang="ts">
import { ref } from "vue";
import BaseInput from "@/components/smallcomponents/baseinput.vue";
import { useAuthStore } from "@/stores/auth";


const authStore = useAuthStore();
const email = ref<string>("");
const password = ref<string>("");
const remember = ref();


</script>
<template>
  <div class="not-found-container">
    <div class="text-container">
      <p>Page Not Found</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/variables.scss";
@import "@/assets/mixin.scss";

$color-border: #ccc;

@include responsive(smartphone) {
  .not-found-container {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    direction: rtl;
    .text-container {
      display: none;
    //   height: 300px;
      p{
        background-color: aqua;
          font-size: 3rem;
      }
    }
  }
}

@include responsive(tablet) {
  .not-found-container {
    flex-direction: row;

    .auth-form {
      form {
        width: 90%;
      }
    }

    .text-container {
      width: 100%;

      img {
        width: 10em;
      }
    }
  }
}

@include responsive(laptop) {
  .not-found-container {
    flex-direction: row;

    .auth-form {
      form {
        width: 60%;
      }
    }

    .text-container {
      img {
        width: 12em;
      }
    }
  }
}

@include responsive(desktop) {
  .not-found-container {
    flex-direction: row;
  }
}

.not-found-container {
  display: flex;
  width: 100%;
  height: 100vh;

  .text-container {
    flex: 1;
    background-color: #f2f7f8;
    z-index: 100;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    
  }
}
</style>
