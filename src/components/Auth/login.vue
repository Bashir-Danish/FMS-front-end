<script setup lang="ts">
import { ref } from "vue";
import BaseInput from "@/components/smallcomponents/baseinput.vue";
import { useAuthStore } from "@/stores/auth";


const authStore = useAuthStore();
const email = ref<string>("");
const password = ref<string>("");
const remember = ref(false);

const handleLoginSubmit = async(event: { preventDefault: () => void }) => {
    event.preventDefault();
   await authStore.login(email.value, password.value, remember.value);
};
</script>
<template>
  <div class="auth-container">
    <div class="circle-container">
      <img src="@/assets/images/image.jpg" alt="" />
      <div class="circle"></div>
    </div>
    <div class="auth-form">
      <form>
        <h1>!خوش آمدید</h1>
        <p>لطفاً اطلاعات خود را وارد کنید</p>
        <BaseInput v-model="email" input-type="email" input-id="ایمیل:" :is-required="true"
          placeholder="ایمیل خود را وارد کنید" />

        <BaseInput v-model="password" input-type="password" input-id="رمز عبور:" :is-required="true"
          placeholder="رمز عبور خود را وارد کنید" />

        <button @click="handleLoginSubmit">ورود</button>
        <div class="options">
          <label>
            <input type="checkbox" v-model="remember" :value="remember" /> مرا به خاطر بسپار به
            مدت 20 روز
          </label>
          <p>فراموشی رمز عبور</p>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/variables.scss";
@import "@/assets/mixin.scss";

$color-border: #ccc;

@include responsive(smartphone) {
  .auth-container {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    direction: rtl;

    .auth-form {
      width: 100%;

      form {
        width: 75%;
      }
    }

    .circle-container {
      display: none;
      height: 300px;

      img {
        width: 8em;
      }
    }
  }
}

@include responsive(tablet) {
  .auth-container {
    flex-direction: row;

    .auth-form {
      form {
        width: 90%;
      }
    }

    .circle-container {
      width: 100%;

      img {
        width: 10em;
      }
    }
  }
}

@include responsive(laptop) {
  .auth-container {
    flex-direction: row;

    .auth-form {
      form {
        width: 60%;
      }
    }

    .circle-container {
      img {
        width: 12em;
      }
    }
  }
}

@include responsive(desktop) {
  .auth-container {
    flex-direction: row;

    .auth-form {
      form {
        width: 75%;
      }
    }

    .circle-container {
      img {
        width: 18em;
      }
    }
  }
}

.auth-container {
  display: flex;
  width: 100%;
  height: 100vh;

  .auth-form {
    flex: 1;
    z-index: 100;
    height: 100%;
    display: flex;
    justify-content: center;
    background-color: $bgOp-9;

    form {
      padding: 1em;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: right;

      // align-items: end;
      h1 {
        margin-bottom: 0.5em;
        color: $dOp-9;
      }

      p {
        margin-bottom: 2.5em;
        color: $dOp-5;
      }

      .form-group {
        margin-bottom: 1em;
        width: 100%;

        label {
          display: block;
          font-weight: 500;
          color: $dOp-7;
          margin-bottom: 5px;
        }

        input {
          width: 100%;
          padding: 0.9em 1em;
          border: 1px solid lighten($color-border, 5%);
          border-radius: 6px;
          font-size: 1em;
          margin-bottom: 0.7em;
          text-align: right;
        }

        z-index: 100;
      }

      button {
        width: 100%;
        padding: 15px;
        background-color: darken($primary, 10%);
        color: #fff;
        border: none;
        border-radius: 10px;
        font-size: 1em;
        font-weight: 500;
        transition: background-color 0.3s ease-in-out;

        &:hover {
          background-color: $primary;
        }
      }

      .options {
        margin-top: 1.5em;
        display: flex;
        justify-content: space-between;
        align-items: baseline;

        p {
          font-size: 0.9em;
          color: darken($primary, 10%);
          text-decoration: none;

          &:hover {
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.circle-container {
  flex: 1;
  background-color: #f2f7f8;
  z-index: 100;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .circle {
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    background-color: rgba(17, 25, 40, 0);
    border-top: 1px solid $bgOp-6;
    animation: waveAnimation 4s linear infinite;
  }

  img {
    border-radius: 50%;
    width: 12rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
  }
}

@keyframes waveAnimation {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(20px);
  }

  100% {
    transform: translateY(0);
  }
}</style>
