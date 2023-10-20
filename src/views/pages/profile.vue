<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { mainStore } from '@/stores/main';
import { Icon } from "@vicons/utils";
import {
  PersonEdit20Regular
} from "@vicons/fluent";
const useAuth = useAuthStore();
const useMain = mainStore();

const isUpdate = ref(false)
const userData = ref({
  name: '',
  lastName: '',
  email: '',
});

// onMounted(async () => {
//   userData.value.name = useAuth.userData?.name;
//   userData.value.lastName = useAuth.userData?.lastName;
//   userData.value.email = useAuth.userData?.email;
// });
</script>

<template>
  <div class="profile-content">
    <!-- <div class="auth-container"> -->
    <div class="blur-container">
      <div class="avatar">
        <img class="image" v-if="useAuth.userData && useAuth.userData.picture"
          :src="useMain.baseUrl + useAuth.userData.picture" alt="" srcset="" />
        <img v-else src="@/assets/images/person.png" alt="" />
      </div>

      <div class="blur">
        <div class="auth-form">
          <form>
            <div class="form-group">
              <label for="name">نام</label>
              <input v-if="isUpdate" type="text" id="name" v-model="useAuth.userData.name">
              <p v-else>{{ useAuth.userData.name }}</p>
            </div>
            <div class="form-group">
              <label for="lastName">تخلص</label>
              <input v-if="isUpdate" type="text" id="lastName" v-model="useAuth.userData.lastName">
              <p v-else>{{ useAuth.userData.lastName }}</p>
            </div>
            <div class="form-group">
              <label for="email"> ایمیل آدرس</label>
              <input v-if="isUpdate" type="email" id="email" v-model="useAuth.userData.email">
              <p v-else id="email">{{ useAuth.userData.email }}</p>
            </div>
            <div class="btn">
              <input v-if="isUpdate" type="button" value="Save Changes">
              <span v-else @click="isUpdate = true">
                <Icon size="30">
                  <PersonEdit20Regular />
                </Icon>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
@import "@/assets/variables.scss";
@import "@/assets/mixin.scss";





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
    .auth-form {
      width: 50%;
      // height: 100%;
      margin: 5rem auto;
      form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: right;
        .form-group {
          margin-bottom: 1em;
          display: flex;
          width: 70%;

          p {
            flex: 1;
            width: 80%;
            padding-right: 0.5rem;
            border-radius: 6px;
            font-size: 1em;
            text-align: right;
            display: flex;
            align-items: center;
            color: $dOp-5;
          }

          label {
            width: 25%;
            font-weight: 500;
            color: $dOp-7;
            margin-bottom: 5px;
          }


          input {
            width: 80%;
            padding: 0.2rem .2rem;
            border: 1px solid lighten($color-border, 5%);
            border-radius: 4px;
            font-size: 1em;
            text-align: right;
            outline: none;
            border: none;

            &:hover,
            &:focus {
              border-bottom: $primary 1px solid;

            }
          }

        }

        .btn {
          width: 30%;
          height: 1.7rem;
          margin-top: 1rem;

          input {
            font-size: 1rem;
            text-align: center;
            outline: none;
            border: none;
            border-radius: 5px;
            background-color: $primary;
            color: $white;
            width: 100%;
            height: 100%;
          }
          span{
            display: flex;
            align-items: center;
            justify-content: center;
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





