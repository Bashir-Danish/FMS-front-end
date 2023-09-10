<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { mainStore } from '@/stores/main';
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
import type { Student } from '@/types/model';
const useAuth = useAuthStore();
const useMain = mainStore();
const isLoading = ref();
const formData = ref({
  student_id: 0,
  name: '',
  fname: '',
  ssid: 0,
  department_id: 0,
  picture: '',
  current_semester: 0
});
const showCreateForm = ref(false);
const showUpdateForm = ref(false);
const selectedStudent = ref<Student | null>(null);

const handleUpdate = (student: any) => {
  selectedStudent.value = student;
  formData.value = { ...student };
  // console.log(formData.value);
  showUpdateForm.value = true;
};


const handlePictureChange = () => {

}
const handleSubmit = async () => {
  if (showCreateForm.value) {
    try {
      await useMain.createStudent(formData.value);
      closeForm();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  } else if (showUpdateForm.value && selectedStudent.value) {
    try {
      console.log(formData.value);

      await useMain.updateStudent({
        student_id: selectedStudent.value.student_id,
        name: formData.value.name,
        fname: formData.value.fname,
        ssid: formData.value.ssid,
        department_id: formData.value.department_id,
        picture: formData.value.picture,
        current_semester: formData.value.current_semester
      });
      closeForm();
    } catch (error) {
      console.error('Error updating user:', error);
    }
    formData.value.name = ''
    formData.value.fname = ''
    formData.value.ssid = 0
    formData.value.department_id = 0
    formData.value.current_semester = 0
  }
};

const handleDelete = async (id: number) => {
  const shouldDelete = window.confirm("Are you sure you want to delete this user?");
  if (shouldDelete) {
    try {
      await useMain.deleteStudent(id);
    } catch (error) {
      console.log(error);
    }
  }
};

const closeForm = () => {
  selectedStudent.value = null;
  formData.value = {
    student_id: 0,
    name: '',
    fname: '',
    ssid: 0,
    department_id: 0,
    picture: '',
    current_semester: 0
  };
  showCreateForm.value = false;
  showUpdateForm.value = false;
  useMain.File = []
};
const selectImage = async (id?: number) => {
  isLoading.value = true
  const path = await useMain.uploadImage('student',id)
  if (path !== '') {
    formData.value.picture = path;
    isLoading.value = false
    console.log(formData.value);

  }
};

onMounted(async () => {
  // await useMain.getAllStudents();

});
</script>

<template>
  <div>
    <div v-if="showCreateForm || showUpdateForm" class="dark-container" @click="closeForm"></div>
    <TransitionGroup name="bounce">
      <div v-if="showCreateForm || showUpdateForm" class="Student-form-overlay">
        <div class="student-form">
          <h2 v-if="showCreateForm">ایجاد محصل جدید</h2>
          <h2 v-if="showUpdateForm">ویرایش محصل</h2>

          <form @submit.prevent="" enctype="multipart/form-data">
            <div class="input-groups">
              <div class="input-group">
                <BaseInput v-model="formData.name" input-type="text" input-id="نام:" :is-required="true"
                  placeholder="نام را وارد کنید" />
              </div>
              <div class="input-group">
                <BaseInput v-model="formData.fname" input-type="text" input-id="نام پدر:" :is-required="true"
                  placeholder="نام پدر را وارد کنید" />
              </div>
            </div>
            <div class="st-input-groups">
              <div class="input-group">
                <BaseInput v-model="formData.ssid" input-type="number" input-id="آیدی:" :is-required="true"
                  placeholder="آیدی را وارد کنید" />
              </div>
              <div class="input-group">
                <label for="number">شماره ترم:</label>
                <select v-model="formData.current_semester" id="number" required>
                  <option v-for="i in 8" :key="i" :value="i">{{ i }}</option>
                </select>
              </div>
              <div class="input-group">
                <label for="dep"> دیپارتمنت:</label>
                <select v-model="formData.department_id" id="dep" required>
                  <option value="" selected disabled>دیپاتمنت</option>
                  <option v-for="department in useMain.departments" :value="department.department_id"
                    :key="department.department_id">
                    {{ department.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="image-input">
              <label for="image">پروفایل</label>
              <div class="dropzone">
                <dropZone v-if="showCreateForm" store="student" :loading="isLoading" @selectImage="selectImage()" />
                <dropZone v-if="showUpdateForm" store="student" :loading="isLoading"
                  @selectImage="selectImage(selectedStudent?.student_id)" />
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

    <div class="student-list">
      <div class="header">
        <span id="num">شماره</span>
        <span id="student-picture">پروفایل</span>
        <span id="student-id">آیدی</span>
        <span id="student-name">نام</span>
        <span id="student-fname">نام پدر</span>
        <span id="st-department">دیپارتمنت</span>
        <span id="st-semester">سمستر</span>
        <span id="add-button">
          <button @click="showCreateForm = true">
            <Icon>
              <Add />
            </Icon>
          </button>
        </span>
      </div>
      <ul>
        <li v-for="(student, index) in useMain.students" :key="student.student_id" class="item">
          <div class="list-item-content">
            <span class="number">{{ index + 1 }}</span>
            <div class="student-picture">
              <img v-if="student.picture" :src="'http://localhost:5000' + student.picture" alt="" srcset="">
              <span v-else>No picture</span>
            </div>
            <p class="student-id">{{ student.ssid }}</p>
            <p class="student-name">{{ student.name }}</p>
            <p class="student-fname">{{ student.fname }}</p>
            <p class="st-department">{{ useMain.departments.find(dept => dept.department_id ===
              student.department_id)?.name }}</p>
            <p class="st-semester">{{ student.current_semester }}</p>
            <div class="edit-student-buttons">
              <button @click="handleUpdate(student)">
                <Icon size="20" color="green">
                  <PencilOutline />
                </Icon>
              </button>
              <button @click="handleDelete(student.student_id)">
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

.student-list {
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

  #student-picture {
    width: 10%;
    text-align: center;
  }

  #student-id {
    width: 10%;
    text-align: center;
  }

  #student-name {
    width: 15%;
    text-align: center;
  }

  #student-fname {
    width: 15%;
    text-align: center;

  }

  #st-department {
    width: 15%;
    text-align: center;

  }

  #st-semester {
    width: 15%;
    text-align: center;

  }

  #add-button {
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

      .number {
        width: 10%;
        padding: 0 1rem;
        text-align: center;

      }

      .student-picture {
        width: 10%;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          border: 1px solid $gray-2;
          max-width: 3.5rem;
          min-width: 3.5rem;
          max-height: 3.5rem;
          min-height: 3.5rem;
          max-height: 3.5rem;
          border-radius: 50%;
        }
      }

      .student-id {
        width: 10%;
        padding: 0 .5rem;
        text-align: center;

      }

      .student-name {
        width: 15%;
        padding: 0 .5rem;
        text-align: center;

      }


      .student-fname {
        width: 15%;
        padding: 0 .5rem;
        text-align: center;

      }

      .st-department {
        width: 15%;
        padding: 0 .5rem;
        text-align: center;
      }

      .st-semester {
        width: 15%;
        padding: 0 .5rem;
        text-align: center;
      }



      .edit-student-buttons {
        flex: 1;
        width: 10%;
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

.Student-form-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem;
  background: rgba(255, 255, 255, 0.975);
  box-shadow: 0 10px 10px 0 rgba(31, 38, 135, 0.17),
    0 -2px 15px 0 rgba(116, 119, 156, 0.085);
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  border-radius: 10px;
  z-index: 800;

  .student-form {
    h2 {
      text-align: center;
    }

    form {
      .input-groups {
        display: flex;
        gap: 1rem;
        padding: 0 1rem;
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

      .st-input-groups {
        display: flex;
        gap: 1rem;
        padding: 0 1rem;
        width: 100%;

        .input-group {
          display: flex;
          flex-direction: column;
          margin: 0 auto;
        }
      }

      .image-input {
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
          margin-top: 1rem;
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
    transform: translate(-50%, -50%) scale(0);
  }

  50% {
    transform: translate(-50%, -50%) scale(1.1);
  }

  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
  