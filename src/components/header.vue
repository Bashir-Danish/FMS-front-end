<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@vicons/utils";
import { IosSearch } from "@vicons/ionicons4";
import {
  IosArrowDown,
  IosArrowForward,
} from "@vicons/ionicons4";
const showDropdown = ref(false);

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
            Profile
          </span>
          <span class="arrow-icon" >
            <Icon>
              <component
                :is="showDropdown ? IosArrowDown : IosArrowForward"
                stroke-width="3"
              ></component>
            </Icon>
          </span>
        </button>
        <div v-if="showDropdown" class="dropdown-menu">
          <a href="#">Option 1</a>
          <a href="#">Option 2</a>
          <a href="#">Option 3</a>
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
      width: 10%;
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
        .arrow-icon{
          display: flex;
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
        a {
          text-decoration: none;
          color: #333;
          padding: 5px;
          border-radius: 5px;
          &:hover {
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
}
</style>
