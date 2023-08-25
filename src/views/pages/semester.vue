<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { mainStore } from '@/stores/main';
import { type Semester } from '@/types/model';
import { Icon } from "@vicons/utils";
import { Delete24Regular } from "@vicons/fluent";
import BaseInput from "@/components/smallcomponents/baseinput.vue";
import {
  Add,
  PencilOutline,
} from "@vicons/ionicons5";
const useMain = mainStore();

const formData = ref({
  name: '',
  year: 0,
  semester_number: 0
});
const showCreateForm = ref(false);
const showUpdateForm = ref(false);
const selectedSemester = ref<Semester | null>(null);
const seasons = ['بهاری', 'تابستانی', 'خزانی', 'زمستانی'];

const handleUpdate = (semester: Semester) => {
  selectedSemester.value = semester;
  formData.value = { ...semester };

  showUpdateForm.value = true;
};

const handleSubmit = async () => {
  if (showCreateForm.value) {
    try {
      await useMain.createSemester(formData.value);
      closeForm();
    } catch (error) {
      console.error('Error creating semester:', error);
    }
  } else if (showUpdateForm.value && selectedSemester.value) {
    try {
      await useMain.updateSemester({
        semester_id: selectedSemester.value.semester_id,
        name: formData.value.name,
        year: formData.value.year,
        semester_number: formData.value.semester_number,
      });
      closeForm();
    } catch (error) {
      console.error('Error updating semester:', error);
    }
  }
};

const handleDelete = async (id: number) => {
  const shouldDelete = window.confirm("Are you sure you want to delete this semester?");
  if (shouldDelete) {
    try {
      await useMain.deleteSemester(id);
    } catch (error) {
      console.log(error);
    }
  }
};

const closeForm = () => {
  selectedSemester.value = null;
  formData.value = {
    name: '',
    year: 0,
    semester_number: 0
  };
  showCreateForm.value = false;
  showUpdateForm.value = false;
};

onMounted(async () => {
  await useMain.getAllSemesters();
});
</script>


<template>
  <div>
    <div v-if="showCreateForm || showUpdateForm" class="dark-container" @click="closeForm"></div>
    <div v-if="showCreateForm || showUpdateForm" class="semester-form-overlay">
      <div class="semester-form">
        <h2 v-if="showCreateForm">ایجاد ترم جدید</h2>
        <h2 v-if="showUpdateForm">ویرایش ترم</h2>
        <form @submit.prevent="handleSubmit">
          <div class="input-group">
            <label for="type">نوع ترم:</label>
            <select v-model="formData.name" id="type" required>
              <option value="" disabled selected>انتخاب نوع ترم</option>
              <option v-for="season in seasons" :key="season" :value="season">{{ season }}</option>
            </select>
          </div>

          <div class="selects-group">
            <div class="input-group">
              <label for="year">سال:</label>
              <select v-model="formData.year" id="year" class="custom-select">
                <option value="" disabled selected>انتخاب سال</option>
                <option v-for="i in 50" :key="1370 + i" :value="1370 + 50 - i">{{ 1370 + 50 - i }}</option>
              </select>

            </div>
            <div class="input-group">
              <label for="number">شماره ترم:</label>
              <select v-model="formData.semester_number" id="number" required>
                <option v-for="i in 8" :key="i" :value="i">{{ i }}</option>
              </select>
            </div>
          </div>
          <div class="button-group">
            <button type="submit">{{ showCreateForm ? 'ذخیره' : 'ویرایش' }}</button>
            <button @click="closeForm" type="button">لغو</button>
          </div>
        </form>
      </div>
    </div>
    <div class="semesters-list">
      <div class="header">
        <span id="num">
          شماره
        </span>
        <span id="name">
          نوع ترم
        </span>
        <span id="year">
          سال
        </span>
        <span id="semester-number">
          شماره ترم
        </span>
        <span id="add-sem-buttons">
          <button @click="showCreateForm = true">
            <Icon>
              <Add />
            </Icon>
          </button>
        </span>
      </div>
      <ul>
        <li v-for="(semester, index) in useMain.semesters" :key="semester.semester_id" class="item">
          <div class="list-item-content">
            <span class="number">{{ index + 1 }}</span>
            <p class="semester-name">{{ semester.name }}</p>
            <p class="semester-year">{{ semester.year }}</p>
            <p class="semester-number">{{ semester.semester_number }}</p>
            <div class="edit-sem-buttons">
              <button @click="handleUpdate(semester)">
                <Icon size="20" color="green">
                  <PencilOutline />
                </Icon>
              </button>
              <button @click="handleDelete(semester.semester_id)">
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

.semesters-list {
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
    width: 15%;
    padding: 0 1rem;
  }

  #name {
    width: 20%;

  }

  #year {
    width: 25%;
    padding: 0 1rem;

  }


  #semester-number {
    width: 25%;

  }

  #add-sem-buttons {
    display: flex;
    justify-content: center;
    width: 15%;

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
        width: 15%;
        padding: 0 1rem;
      }

      .semester-name {
        width: 20%;
        padding: 0 .5rem;

      }

      .semester-year {
        width: 25%;
        padding: 0 .5rem;

      }

      .semester-number {
        width: 25%;
        padding: 0 .5rem;

      }



      .edit-sem-buttons {
        flex: 1;
        width: 15%;
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

.semester-form-overlay {
  position: absolute;
  top: 10%;
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

  .semester-form {
    h2 {
      text-align: center;
    }

    form {
      .selects-group {
        display: flex;
        width: 90%;
        margin: 0 auto;
        gap: 1rem;
      }

      .input-group {
        display: flex;
        flex-direction: column;
        width: 90%;
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

/* Hover effect for select options */
.custom-select option:hover {
  background-color: #f0f0f0;
}

/* Hover effect for select options */
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
  