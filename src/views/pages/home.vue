
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { mainStore } from '@/stores/main';
import BaseInput from "@/components/smallcomponents/baseinput.vue";
import { Icon } from "@vicons/utils";
import {
  PeopleTeam28Regular,
  PeopleSync16Regular,
  Apps28Regular,
  Person24Regular
} from "@vicons/fluent";

import {
  Add,
  PencilOutline,
} from "@vicons/ionicons5";
import { type Department } from '@/types/model';

const useMain = mainStore();




</script>


<template>
  <div class="home-content">
    <div class="section-1">
      <div class="card">
        <div class="card-items">
          <div class="card-item">
            <span class="icon">
              <Icon size="40">
                <PeopleTeam28Regular />
              </Icon>
            </span>
            <span class="details">
              <span>کل محصلین </span>
              <span>3270</span>
            </span>
          </div>
          <div class="card-item">
            <span class="icon">
              <Icon size="40">
                <PeopleSync16Regular />
              </Icon>
            </span>
            <span class="details">
              <span> محصلین برحال</span>
              <span>170</span>
            </span>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-items">
          <div class="card-item">
            <span class="icon">
              <Icon size="40">
                <PeopleTeam28Regular />
              </Icon>
            </span>
            <span class="details">
              <span> محصلین برحال</span>
              <span>270</span>
            </span>
          </div>
          <div class="card-item">
            <span class="icon">
              <Icon size="40">
                <PeopleTeam28Regular />
              </Icon>
            </span>
            <span class="details">
              <span> محصلین برحال</span>
              <span>270</span>
            </span>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-items">
          <div class="card-item">
            <span class="icon">
              <Icon size="40">
                <Apps28Regular />
              </Icon>
            </span>
            <span class="details">
              <span>دیپارتمنت ها</span>
              <span>3</span>
            </span>
          </div>
          <div class="card-item">
            <span class="icon">
              <Icon size="40">
                <Person24Regular />
              </Icon>
            </span>
            <span class="details">
              <span>تعداد کاربران</span>
              <span>11</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="section-2">

    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/variables.scss";
@import "@/assets/mixin.scss";

.home-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: rgba(255, 255, 255, 0.3);

  // background: rgba(255, 255, 255, 0.3);
  // box-shadow: 0 2px 3px 0 rgba(31, 38, 135, 0.37),
  //   0 -1px 3px 0 rgba(116, 119, 156, 0.085);
  // backdrop-filter: blur(0px);
  // -webkit-backdrop-filter: blur(0px);
  // border-radius: 10px;
  // border: 2px solid rgba(255, 255, 255, 0.98);
  height: calc(100vh - 6.5em);
  // font-size: 16px;

  @include hideScrollbar();

  &:hover {
    @include scrollbar();
  }

  .section-1 {
    height: 45%;
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;

    .card {
      flex: 1;
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      background: rgba(255, 255, 255, 0.3);
      box-shadow: 0 2px 3px 0 rgba(82, 88, 170, 0.37),
        0 -1px 1px 0 rgba(116, 119, 156, 0.085);
      backdrop-filter: blur(0px);
      -webkit-backdrop-filter: blur(0px);
      border-radius: 10px;
      border: 2px solid rgba(255, 255, 255, 0.98);
      // padding: 1rem;
      overflow: hidden;

      h3 {
        height: 10%;
        text-align: right;
        padding: .2rem 1rem;
      }

      .card-items {
        height: 90%;
        flex: 1;
        margin: 0;
        padding: 0;
        width: 100%;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;


        .card-item {
          display: flex;
          flex: 1;
          background-color: white;
          box-shadow: 0 2px 3px 0 rgba(112, 117, 190, 0.37),
            0 1px 1px 0 rgba(116, 119, 156, 0.085);
          border: 2px solid rgba(255, 255, 255, 0.98);
          border-radius: 7px;
      overflow: hidden;


          .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30%;
            height: 100%;
            color: $primary;
          }

          .details {
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: center;
            // padding: 0 1rem;

            span:first-child {
              font-size: 12px;

            }

            span:last-child {
              background: linear-gradient(to right, #007bff, #6610f2);
              -webkit-background-clip: text;
              background-clip: text;
              font-size: 30px;
              font-weight: bolder;
              color: transparent;
            }
          }
        }
      }
    }
  }

  .section-2 {
    height: 55%;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 2px 3px 0 rgba(31, 38, 135, 0.37),
      0 -1px 3px 0 rgba(116, 119, 156, 0.085);
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
    border-radius: 10px;
    border: 2px solid rgba(255, 255, 255, 0.98);
  }

}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .8rem;
  box-shadow: 0 4px 2px -2px rgba(31, 38, 135, 0.17);
  background-color: #FAFBFF;
  // position: sticky;
  // top: 3rem;
  font-size: 1.1rem;
  z-index: 1;
  border-radius: 5px;

  #num {
    width: 10%;
    padding: 0 1rem;
  }

  #name {
    width: 80%;
  }

  #add-dep-button {
    display: flex;
    justify-content: center;
    width: 10%;

    button {
      background-color: #fff;
      border-radius: 5px;
      font-size: 25px;
      width: 30px;
      height: 100%;
      border: 1px solid $dOp-1;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $dOp-2;
      margin: 0 auto;
      cursor: pointer;

      &:hover {
        color: #159347;
      }
    }
  }
}

ul {
  list-style: none;
  padding: .5rem 0 0 0;
  width: 100%;
  @include hideScrollbar();

  &:hover {
    @include scrollbar();
  }

  overflow-y: auto;


  .item {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    padding: .8rem;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 2px 2px 0 rgba(31, 38, 135, 0.17), 0 -2px 2px 0 rgba(116, 119, 156, 0.085);
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
    border-radius: 10px;

    .list-item-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      .department-number {
        width: 10%;
        padding: 0 1rem;
      }

      .department-name {
        width: 80%;
      }

      .add-dep-buttons {
        flex: 1;
        width: 10%;
        display: flex;
        justify-content: end;

        button {
          background-color: transparent;
          border: none;
          margin-left: 1rem;
          cursor: pointer;
        }

      }
    }
  }
}

.dep-form-overlay {
  position: absolute;
  top: 20%;
  right: 35%;
  left: 35%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.975);
  box-shadow: 0 10px 10px 0 rgba(31, 38, 135, 0.17),
    0 -2px 15px 0 rgba(116, 119, 156, 0.085);
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  border-radius: 10px;
  z-index: 800;

  .dep-form {
    h2 {
      text-align: center;
    }

    form {
      .input-group {
        width: 80%;
        margin: 0 auto;
      }

      .button-group {
        width: 80%;
        margin: 0 auto;
        display: flex;
        justify-content: space-evenly;

        button {
          border: none;
          border-radius: 5px;
          height: 2.5rem;
          font-size: 1.1rem;
          // width: 2.5rem;
          width: 30%;
          color: $gray-1;
          cursor: pointer;

          &:first-child {
            background-color: $primary;
          }

          &:last-child {
            background-color: $red;
          }
        }
      }
    }
  }
}

.dark-container {
  background-color: #0000003f;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 500;
}
</style>
  