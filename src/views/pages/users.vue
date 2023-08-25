<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import BaseInput from "@/components/smallcomponents/baseinput.vue";
import dropZone from '@/components/smallcomponents/dropzone.vue';
import { Icon } from "@vicons/utils";
import {
  Delete24Regular
} from "@vicons/fluent";

import {
  Add,
  PencilOutline,
} from "@vicons/ionicons5";
import type { User } from '@/types/model';
const useAuth = useAuthStore();

const formData = ref({
  name: '',
  lastName: '',
  email: '',
  password: '',
  picture: null,
  userType: '',
});
const showCreateForm = ref(false);
const showUpdateForm = ref(false);
const selectedUser = ref<User | null>(null);

const handleUpdate = (user: any) => {
  selectedUser.value = user;
  formData.value = { ...user };
  showUpdateForm.value = true;
};


const handlePictureChange = () => {

}
const handleSubmit = async () => {
  if (showCreateForm.value) {
    try {
      await useAuth.createUser(formData.value);
      closeForm();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  } else if (showUpdateForm.value && selectedUser.value) {
    try {
      await useAuth.updateUser({
        user_id: selectedUser.value.user_id,
        name: formData.value.name,
        lastName: formData.value.lastName,
        email: formData.value.email,
        password: formData.value.password,
        picture: formData.value.picture,
        userType: formData.value.userType,
      });
      closeForm();
    } catch (error) {
      console.error('Error updating user:', error);
    }
    formData.value.name =''
    formData.value.lastName =''
    formData.value.email =''
    formData.value.password =''
    formData.value.userType =''
    formData.value.picture =null
  }
};

const handleDelete = async (id: number) => {
  const shouldDelete = window.confirm("Are you sure you want to delete this user?");
  if (shouldDelete) {
    try {
      await useAuth.deleteUser(id);
    } catch (error) {
      console.log(error);
    }
  }
};

const closeForm = () => {
  selectedUser.value = null;
  formData.value = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    picture: null,
    userType: 'کاربر',
  };
  showCreateForm.value = false;
  showUpdateForm.value = false;
  useAuth.File = []

};

onMounted(async () => {
  await useAuth.getAllUsers();
});
</script>


<template>
  <div>
    <div v-if="showCreateForm || showUpdateForm" class="dark-container" @click="closeForm"></div>
    <TransitionGroup  name="bounce">
      <div v-if="showCreateForm || showUpdateForm" class="user-form-overlay">
        <div class="user-form">
          <h2 v-if="showCreateForm">ایجاد کاربر جدید</h2>
          <h2 v-if="showUpdateForm">ویرایش کاربر</h2>
  
          <form @submit.prevent="" enctype="multipart/form-data">
  
            <div class="input-groups">
              <div class="input-group">
                <BaseInput v-model="formData.name" input-type="text" input-id="نام:" :is-required="true"
                  placeholder="نام را وارد کنید" />
              </div>
              <div class="input-group">
                <BaseInput v-model="formData.lastName" input-type="text" input-id="تخلص:" :is-required="true"
                  placeholder="تخلص را وارد کنید" />
              </div>
            </div>
            <div class="input-group">
              <BaseInput v-model="formData.email" input-type="email" input-id="ایمیل:" :is-required="true"
                placeholder="ایمیل را وارد کنید" />
            </div>
  
            <div class="input-groups">
              <div class="input-group">
                <BaseInput v-model="formData.password" input-type="password" input-id="رمز عبور:" :is-required="true"
                  placeholder="رمز عبور را وارد کنید" />
              </div>
              <div class="input-group">
                <label for="number">شماره ترم:</label>
                <select v-model="formData.userType" id="number" required>
                  <option value="" disabled selected> نوع کاربر</option>
                  <option value="کاربر" >کاربر</option>
                  <option value="استاد" >استاد</option>
                </select>
              </div>
  
            </div>
            <div class="image-input">
              <label for="image">پروفایل</label>
              <div class="dropzone">
                <dropZone />
              </div>
            </div>
  
            <div class="button-group">
              <button type="button" @click="handleSubmit()">{{ showCreateForm ? 'ذخیره' : 'ویرایش' }}</button>
              <button @click="closeForm" type="button">لغو</button>
            </div>
          </form>
        </div>
      </div>
    </TransitionGroup>

    <div class="users-list">
      <div class="header">
        <span id="num">شماره</span>
        <span id="user-picture">پروفایل</span>
        <span id="user-name">نام</span>
        <span id="user-email">ایمیل</span>
        <span id="user-type">نوع کاربر</span>
        <span id="add-button">
          <button @click="showCreateForm = true">
            <Icon>
              <Add />
            </Icon>
          </button>
        </span>
      </div>
      <ul>
        <li v-for="(user , index) in useAuth.users" :key="user.user_id" class="item">
          <div class="list-item-content">
            <span class="number">{{ index +1 }}</span>
            <div class="user-picture">
              <img v-if="user.picture" :src="'http://localhost:5000' + user.picture" alt="" srcset="">
              <!-- <img v-if="user.picture" :src="user.picture" alt="Profile Picture" /> -->
              <span v-else>No picture</span>
            </div>
            <p class="user-name">{{ user.name }} {{ user.lastName }}</p>
            <p class="user-email">{{ user.email }}</p>
            <p class="user-type">{{ user.userType }}</p>
            <div class="edit-user-buttons">
              <button @click="handleUpdate(user)">
                <Icon size="20" color="green">
                  <PencilOutline />
                </Icon>
              </button>
              <button @click="handleDelete(user.user_id)">
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

.users-list {
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
    text-align: center;
  }

  #user-picture {
    width: 15%;
    text-align: center;
  }

  #user-name {
    width: 15%;
    text-align: center;

  }

  #user-email {
    width: 25%;
    text-align: center;

  }

  #user-type {
    width: 15%;
    text-align: center;

  }

  #add-button {
    display: flex;
    justify-content: center;
    width: 20%;

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

      .number {
        width: 10%;
        padding: 0 1rem;
        text-align: center;
      }

      .user-picture {
        width: 15%;
        display: flex;
        align-items: center;
        justify-content: center;
        
        img{
          border: 1px solid $gray-2;
          max-width:  3.5rem;
          min-width:  3.5rem;
          max-height: 3.5rem;
          min-height: 3.5rem;
          max-height: 3.5rem;
          border-radius: 50%;
        }
      }

      .user-name {
        width: 15%;
        padding: 0 .5rem;
        text-align: center;

      }

      .user-email {
        width: 25%;
        padding: 0 .5rem;
    text-align: center;

      }

      .user-type {
        width: 15%;
        padding: 0 .5rem;
        text-align: center;
      }



      .edit-user-buttons {
        flex: 1;
        width: 20%;
        display: flex;
        align-items: end;
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

.user-form-overlay {
  position: absolute;
  top: 10%;
  right: 30%;
  left: 30%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.975);
  box-shadow: 0 10px 10px 0 rgba(31, 38, 135, 0.17),
    0 -2px 15px 0 rgba(116, 119, 156, 0.085);
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  border-radius: 10px;
  z-index: 800;

  .user-form {
    h2 {
      text-align: center;
    }

    form {
      .input-groups{
        display: flex;
        gap: 1rem;
        padding:0 1rem;
        width: 100%;
      }
      .selects-group {
        display: flex;
        width: 90%;
        margin: 0 auto;
        gap: 1rem;
      }

      .input-group {
        display: flex;
        flex-direction: column;
        width: 95%;
        margin: 0 auto;

        select {
          width: 100%;
          padding: 0.9em 1em;
          border: 1px solid lighten($color-border, 5%);
          border-radius: 6px;
          font-size: 1em;
          margin-bottom: 1rem;
          text-align: right;
        }
      }
      .image-input{
        width: 95%;
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
          margin-top:1rem ;
          width: 30%;
          color: $gray-1;
          cursor: pointer;

          &:first-child {
            background-color: $green;
          }

          &:last-child {
            background-color: $red;
          }
        }
      }
    }
  }
}


select {
  padding: 8px 20px 8px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: white;
  background-image: linear-gradient(45deg, transparent 50%, #888 50%), linear-gradient(135deg, #888 50%, transparent 50%);
  background-position: calc(15px) center, calc(20px) center;
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
}

.custom-select option {
  background-color: #fff;
  color: #333;
  padding: 8px;
  transition: background-color 0.2s ease-in-out;
}

.custom-select option:hover {
  background-color: #f0f0f0;
}

.dark-container {
  background-color: #0000003f;
  width: 100%;
  height: 110vh;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 500;
}

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
  