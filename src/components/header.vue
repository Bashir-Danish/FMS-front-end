<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@vicons/utils";
import { IosSearch } from "@vicons/ionicons4";
import {
  IosArrowDown,
  IosArrowForward,
} from "@vicons/ionicons4";
import {
  SignOut20Regular
} from "@vicons/fluent";
const showDropdown = ref(false);
import { destroyToken } from '@/utils/jwt';
import { useRouter } from "vue-router";
import { mainStore } from '@/stores/main';
import { useAuthStore } from '@/stores/auth';

const useAuth = useAuthStore();
const useMain = mainStore();
const router = useRouter();

const logout = () => {
  destroyToken();

  router.push('/login');
};


const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};
</script>
<template>
  <header>
    <div class="search-part">
      <div class="search">
        <span class="search-icon">
          <Icon>
            <IosSearch />
          </Icon>
        </span>
        <input type="text" placeholder="جستجو..." />
      </div>
      <div class="profile" @mouseleave="showDropdown = false">
        <button @click="toggleDropdown">
          <span>
            {{ useAuth.userData?.name }}
            {{ useAuth.userData?.lastName }}
          </span>
          <span class="arrow-icon">
            <Icon>
              <component :is="showDropdown ? IosArrowDown : IosArrowForward" stroke-width="3"></component>
            </Icon>
          </span>
        </button>
        <div v-if="showDropdown" class="dropdown-menu">
          <span  @click="router.push('/profile')">
            <img  v-if="useAuth.userData && useAuth.userData.picture" :src="useMain.baseUrl + useAuth.userData.picture"
              alt="" srcset="">
            <img v-else src="@/assets/images/person.png" alt="" />
          </span>
          <span @click="router.push('/profile')">
            {{ useAuth.userData?.name }}
            {{ useAuth.userData?.lastName }}
          </span>
          <span>
            <span @click="logout">
              خروج
            </span>
            <span @click="logout">
              <Icon size="25">
                <SignOut20Regular />
              </Icon>
            </span>
          </span>

        </div>
      </div>
    </div>
    <!-- <div class="path-part">
      <span> مسیر / خانه</span>
    </div> -->
  </header>
</template>


<style scoped lang="scss">
@import "@/assets/variables.scss";

header {
  position: sticky;
  top: -1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #FAFBFF;
  //   background: rgba(255, 255, 255, 0.829);
  //   backdrop-filter: blur(4px);
  //   -webkit-backdrop-filter: blur(4px);
  //   border-radius: 10px;
  height: 3.5rem;
  direction: rtl;

  .search-part {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.3rem;
    width: 100%;
    z-index: 10000;

    .search {
      display: flex;
      align-items: center;
      justify-content: end;
      background-color: #eeeeee;
      border-radius: 20px;
      padding: 5px;
      width: 30%;
      height: 2rem;
      font-size: 1.1rem;
      margin-right: 1rem;
      box-shadow: 0 1px 2px 0 rgba(31, 38, 135, 0.27);

      input {
        border: none;
        outline: none;
        background-color: transparent;
        margin-right: 5px;
        // background-color: rgb(0, 255, 0);
        width: 90%;
        height: 100%;
        font-size: 1.1rem;
        color: $dOp-6;
      }

      .search-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 5%;
        font-size: 1.1rem;
        color: $dOp-4;
        height: 100%;
        margin-right: 0.5rem;
        cursor: pointer;
      }
    }

    .profile {
      position: relative;
      width: 12%;
      background-color: #ffffff;
      border-radius: 2rem;
      height: 2rem;
      margin-left: 1rem;

      button {
        border-radius: 2rem;
        border: 1px solid $dOp-1;
        background-color: #ffffff;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;

        .arrow-icon {
          display: flex;
        }

        span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .dropdown-menu {
        position: absolute;
        top: 100%;
        right: 0;
        background-color: #fff;
        border: 1px solid $dOp-1;
        border-radius: 1rem;
        padding: 10px;
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 5px;
        box-shadow: 0 2px 5px 0 rgba(31, 38, 135, 0.037),
          0 -1px 2px 0 rgba(196, 199, 235, 0.085);

        span {
          display: flex;
          justify-content: space-between;
          text-decoration: none;
          width: 100%;
          color: #333;
          padding: 5px;
          border-radius: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          img {
            width: 50%;
            height: 3.5rem;
            border-radius: 50%;
            margin: 0 auto;
          }

          span {
            width: 100%;
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;

            &:last-child {
              padding: 0;
              margin: 0;

            }


          }

          cursor: pointer;

          &:last-child:hover {
            background-color: #f1f1f1;
          }
        }
      }
    }
  }

  .path-part {
    margin-right: 1rem;
    padding-right: 2rem;
  }

  z-index: 10;
}</style>
