<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { mainStore } from '@/stores/main';
import BaseInput from "@/components/smallcomponents/baseinput.vue";
import { Icon } from "@vicons/utils";
import {
  Delete24Regular
} from "@vicons/fluent";

import {
  Add,
  PencilOutline,
} from "@vicons/ionicons5";
import { type Department } from '@/types/model';

const useMain = mainStore();

const formData = ref({ name: '' });
const showCreateForm = ref(false);
const showUpdateForm = ref(false);
const selectedDepartment = ref<Department | null>(null); 

const handleUpdate = (department: Department) => {
  selectedDepartment.value = department;
  formData.value.name = department.name;
  showUpdateForm.value = true;
};



const handleSubmit = async () => {
  if (showCreateForm.value) {
    try {
      await useMain.createDepartment(formData.value.name);
      closeForm();
    } catch (error) {
      console.error('Error creating department:', error);
      showCreateForm.value = false
    }
  } else if (showUpdateForm.value && selectedDepartment.value) {
    try {
      await useMain.updateDepartment({
        department_id: selectedDepartment.value.department_id,
        name: formData.value.name,
      });
      closeForm();
    } catch (error) {
      console.error('Error updating department:', error);
    }
  }
};

const handleDelete = async (id: number) => {
  const shouldDelete = window.confirm("Are you sure you want to delete this department?");
  if (shouldDelete) {
    try {
      await useMain.deleteDepartment(id);
    } catch (error) {
      console.log(error);
    }
  }

};
const closeForm = () => {
  selectedDepartment.value = null;
  formData.value.name = '';
  showCreateForm.value = false;
  showUpdateForm.value = false;
};
onMounted(async () => {
  // await useMain.getAllDepartments();
});
</script>


<template>
  <div>
    <div v-if="showCreateForm || showUpdateForm" class="dark-container" @click="closeForm"></div>
    <div v-if="showCreateForm || showUpdateForm" class="dep-form-overlay">
      <div class="dep-form">
        <h2 v-if="showCreateForm">ایجاد دپارتمان جدید</h2>
        <h2 v-if="showUpdateForm">ویرایش دپارتمان</h2>
        <form @submit.prevent="handleSubmit">
          <div class="input-grout">
            <BaseInput v-model="formData.name" input-type="text" input-id="نام:" :is-required="true"
              placeholder="نام را وارد کنید" />
          </div>
          <div class="button-group">
            <button type="submit">{{ showCreateForm ? 'ذخیره' : 'ویرایش' }}</button>
            <button @click="closeForm" type="button">لغو</button>
          </div>
        </form>
      </div>
    </div>
    <div class="departments-list">
      <div class="header">
        <span id="num">
          شماره
        </span>
        <span id="name">
          نام
        </span>
        <span id="add-dep-button">
          <button @click="showCreateForm = true">
            <Icon>
              <Add />
            </Icon>
          </button>
        </span>
      </div>
      <ul>
        <li v-for="(department, index) in useMain.departments" :key="department.department_id" class="item">
          <div class="list-item-content">
            <span class="department-number">{{ index + 1 }}</span>
            <p class="department-name">{{ department.name }}</p>
            <div class="add-dep-buttons">
              <button @click="handleUpdate(department)">
                <Icon size="20" color="green">
                  <PencilOutline />
                </Icon>
              </button>
              <button @click="handleDelete(department.department_id)">
                <Icon size="20" color="red">
                  <Delete24Regular />
                </Icon>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/variables.scss";
@import "@/assets/mixin.scss";

.departments-list {
  width: 100%;
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
  // font-size: 16px;

  @include hideScrollbar();

  &:hover {
    @include scrollbar();
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
}</style>
  