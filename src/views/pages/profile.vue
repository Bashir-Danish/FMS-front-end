<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { mainStore } from '@/stores/main';

const useAuth = useAuthStore();
const useMain = mainStore();


</script>

<template>
  <div class="profile-content">
    <div class="auth-container">
      <div class="blur-container">
        <div class="avatar">
          <img class="image" v-if="useAuth.userData && useAuth.userData.picture"
            :src="useMain.baseUrl + useAuth.userData.picture" alt="" srcset="" />
          <img v-else src="@/assets/images/person.png" alt="" />
        </div>
        <div class="blur"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/variables.scss";
@import "@/assets/mixin.scss";



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

    form {
      padding: 1em;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: right;

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

.blur-container {
  flex: 1;
  z-index: 100;
  height: 100%;
  width: 100%;
  position: relative;

  .blur {
    width: 100%;
    height: 70%;
    position: absolute;
    bottom: 0;
    backdrop-filter: blur(7px);
    -webkit-backdrop-filter: blur(3px);
    background-color: rgba(255, 255, 255, 0.151);
    border-top: 1px solid $bgOp-9;
    z-index: 3;
  }

  .avatar {
    width: 12rem;
    height: 12rem;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 6;
    border: 2px solid #fff;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.profile-content {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 3px 0 rgba(31, 38, 135, 0.37),
    0 -1px 3px 0 rgba(116, 119, 156, 0.085);
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.98);
  height: calc(100vh - 6.5em);

  @include hideScrollbar();

  &:hover {
    @include scrollbar();
  }
}
</style>





