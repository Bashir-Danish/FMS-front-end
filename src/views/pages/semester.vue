<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { mainStore } from '@/stores/main';
import { type Semester } from '@/types/model';
import { Icon } from "@vicons/utils";
import { Delete24Regular, ArrowCollapseAll20Regular, ArrowAutofitHeightDotted20Filled } from "@vicons/fluent";

import {
  Add,
  PencilOutline,
} from "@vicons/ionicons5";
const useMain = mainStore();

const formData = ref({
  name: '',
  year: 0,
  semester_number: 0,
  is_passed: 0
});
const showCreateForm = ref(false);
const showUpdateForm = ref(false);
const semSaveChange = ref(false);

const selectedSemester = ref<Semester | null>(null);
const semesterToChange = ref<any[]>([])
const seasons = ['بهاری', 'تابستانی', 'خزانی', 'زمستانی'];

const semesterData = computed(() => {
  if (useMain.semesterSTR) {
    const searchLowerCase = useMain.semesterSTR.toLowerCase();
    return useMain.semesters.filter((item) => {
      const nameMatch = item.name?.toLowerCase().includes(searchLowerCase);
      const yearMatch = item.year.toString().includes(searchLowerCase);
      const numberMatch = item.semester_number.toString().includes(searchLowerCase);

      return (nameMatch || yearMatch || numberMatch) && item.is_passed === 0;
    });
  }
  return useMain.semesters.filter((item) => item.is_passed === 0);
});


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
    console.log('dtt')
    try {
      await useMain.updateSemester({
        semester_id: selectedSemester.value.semester_id,
        name: formData.value.name,
        year: formData.value.year,
        semester_number: formData.value.semester_number,
        is_passed: formData.value.is_passed,
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
    semester_number: 0,
    is_passed: 0
  };
  showCreateForm.value = false;
  showUpdateForm.value = false;
  semSaveChange.value = false;
  semesterToChange.value = [];
};
const translateSemesterNumber = (number: number) => {
  const translations = ["اول", "دوم", "سوم", "چهارم", "پنجم", "ششم", "هفتم", "هشتم"];

  if (number >= 1 && number <= 8) {
    return translations[number - 1];
  } else {
    return "نامعلوم";
  }
}
const filterSavedSemester = (semester_id: number) => {
  semesterToChange.value = semesterToChange.value.filter(s => s.semester.semester_id != semester_id)
}
const addToSavedSemester = (semester: Semester) => {
  const existingSemester = semesterToChange.value.find((s) => s.semester.semester_id === semester.semester_id);
  if (!existingSemester) {
    semesterToChange.value.push({
      semester: semester,
      isFinished: false,
    });
  }
};

const sendSemesterToUpdate = async () => {
  let data: any[] = [];
  semesterToChange.value.forEach((element) => {
    data.push({
      semester_id: element.semester.semester_id,
      isFinished: element.isFinished,
    });
  });
  await useMain.processEnrolls(data);
  useMain.semesterSTR = '';
  closeForm();
};

const handleSwitchClick = (semester: any) => {
  console.log(semester);

}

const sortedSemesters = computed(() => {
  const Semesters = useMain.semesters.slice().sort((a, b) => {
    if (a.is_passed === b.is_passed) {
      if (a.year === b.year) {

        return a.semester_number - b.semester_number;
      }

      return b.year - a.year;
    }

    return a.is_passed ? 1 : -1;
  });

  return Semesters;
})
onMounted(async () => {
  // await useMain.getAllSemesters();
});
</script>


<template>
  <div>
    <div v-if="showCreateForm || showUpdateForm || semSaveChange" class="dark-container" @click="closeForm"></div>
    <TransitionGroup name="bounce">
      <div v-if="showCreateForm || showUpdateForm" class="semester-form-overlay">
        <div class="semester-form">
          <h2 v-if="showCreateForm">ایجاد ترم جدید</h2>
          <h2 v-if="showUpdateForm">ویرایش ترم</h2>
          <form @submit.prevent="handleSubmit">

            <div class="selects-group">
              <div class="input-group">
                <label for="type">نوع ترم:</label>
                <select v-model="formData.name" id="type" required>
                  <option value="" disabled selected>انتخاب نوع ترم</option>
                  <option v-for="season in seasons" :key="season" :value="season">{{ season }}</option>
                </select>
              </div>
              <div class="input-group">
                <label for="number">شماره ترم:</label>
                <select v-model="formData.is_passed" id="number" required>
                  <option value="0">تمام نشده</option>
                  <option value="1">تمام شده</option>
                </select>
              </div>
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
    </TransitionGroup>
    <TransitionGroup name="bounce">
      <div v-if="semSaveChange" class="save-semester-overlay">
        <div class="semester-form">
          <h3>سمستر های که میخواهید تغیرات روی آنها اعمال شود را انتخاب کنید</h3>
          <form @submit.prevent="handleSubmit">
            <ul class="edit-semester-ul">
              <input type="text" class="search-semester" placeholder="جستجو...." v-model="useMain.semesterSTR">
              <transition-group name="listTransition">
                <li v-for="(semester, index) in semesterData" :key="index">
                  <span>{{ translateSemesterNumber(semester.semester_number) }}</span>
                  <span>{{ semester.name }}d</span>
                  <span>{{ semester.year }}</span>
                  <span class="add" @click="addToSavedSemester(semester)">
                    <Icon>
                      <Add />
                    </Icon>
                  </span>
                </li>
              </transition-group>
            </ul>
            <span class="divider">
              <Icon>
                <ArrowAutofitHeightDotted20Filled />
              </Icon>
            </span>
            <ul class="edit-semester-ul">
              <transition-group name="listTransition" v-if="semesterToChange.length">
                <li v-for="(semester, index) in semesterToChange" :key="index">
                  <span>{{ translateSemesterNumber(semester.semester.semester_number) }}</span>
                  <span>{{ semester.semester.name }}</span>
                  <span>{{ semester.semester.year }}</span>
                  <label class="switch" v-if="semester.semester.semester_number == 8">
                    <span>تمام شده </span>
                    <input type="checkbox" v-model="semester.isFinished">
                    <span class="slider round"></span>
                  </label>
                  <span class="trash" @click="filterSavedSemester(semester.semester.semester_id)">
                    <Icon>
                      <Delete24Regular />
                    </Icon>
                  </span>
                </li>
              </transition-group>
              <span class="empty-text" v-else>
                خالی
              </span>
            </ul>
            <div class="button-group">
              <button type="submit" @click="sendSemesterToUpdate()">تغیرات اعمال شود</button>
              <button @click="closeForm" type="button">لغو</button>
            </div>
          </form>
        </div>
      </div>
    </TransitionGroup>

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
        <span id="semester-passed">
          جریان
        </span>
        <span id="add-sem-buttons">
          <button @click="semSaveChange = true">
            <Icon>
              <ArrowCollapseAll20Regular />
            </Icon>
          </button>
          <button @click="showCreateForm = true">
            <Icon>
              <Add />
            </Icon>
          </button>
        </span>
      </div>
      <ul>
        <li v-for="(semester, index) in sortedSemesters" :key="semester.semester_id" class="item">
          <div class="list-item-content">
            <span class="number">{{ index + 1 }}</span>
            <p class="semester-name">{{ semester.name }}</p>
            <p class="semester-year">{{ semester.year }}</p>
            <p class="semester-number">{{ semester.semester_number }}</p>
            <p class="semester-passed">{{ semester.is_passed == 0 ? 'در جریان' : 'تمام شده' }}</p>
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
    width: 15%;
    padding: 0 1rem;

  }


  #semester-number {
    width: 15%;
    text-align: center;

  }

  #semester-passed {
    width: 15%;
    text-align: center;
  }

  #add-sem-buttons {
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
        color: $primary;
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
        width: 15%;
        padding: 0 .5rem;

      }

      .semester-number {
        width: 15%;
        padding: 0 .5rem;
        text-align: center;


      }

      .semester-passed {
        width: 15%;
        padding: 0 .5rem;
        text-align: center;


      }


      .edit-sem-buttons {
        flex: 1;
        width: 20%;
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
  height: 20rem;
  max-height: 20rem;
  width: 20rem;
  min-width: 25rem;
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

.save-semester-overlay {
  position: absolute;
  height: 38rem;
  width: 40rem;
  min-width: 35rem;
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

  .semester-form {
    h3 {
      text-align: center;
    }

    form {
      margin: 0 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      .input-group {
        display: flex;
        flex-direction: column;
        width: 90%;
        margin: 0 auto;
      }

      .edit-semester-ul {
        overflow-y: scroll;
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;
        border-radius: 5px;
        min-height: 13rem;
        max-height: 13rem;
        // margin: 1em 0;
        // padding: 1em 0;
        position: relative;
        list-style-type: none;
        border: 1px dashed #ccc;
        padding: 1em 0;

        &:first-child {
          margin: 1em 0;
          padding: 0;

        }

        .search-semester {
          width: 100%;
          background-color: white;
          z-index: 100;
          position: sticky;
          top: 0;
          padding: 0.6em;
          border: none;
          outline: none;
          border-bottom: 1px solid lighten($color-border, 5%);
          font-size: 1.1em;
          text-align: right;
          text-align: center;


          &:focus {
            border-bottom: $primary 1px solid;

          }
        }

        // background-color: #b6b0b0;

        @include hideScrollbar();

        &:hover {
          @include scrollbar();
        }

        li {
          width: 90%;
          display: flex;
          align-items: center;
          padding: 0.3em;
          margin: 0.3em;
          border-radius: 5px;
          min-height: 2.2rem;
          background: transparent;
          transition: 0.3s ease all;
          box-shadow: 0 2px 3px 0 rgba(136, 137, 138, 0.37),
            0 -1px 3px 0 rgba(160, 160, 160, 0.085);
          position: relative;
          color: rgba(0, 0, 0, 0.7);

          span {
            width: 18%;
            padding-right: 1em;

            &:last-child {
              // width: 35%;
              width: 90px;
            }
          }


          .add,
          .trash {
            left: 0em;
            position: absolute;
            font-size: 22px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: left;
            cursor: pointer;

            &:hover {
              color: $primary;
            }
          }

          .trash {
            font-size: 20px;

            &:hover {
              color: $red;
            }
          }

          &:hover {
            background: rgba(244, 245, 247)
          }

          .switch {
            position: relative;
            display: inline-block;
            width: 100px;
            height: 20px;

            span {
              &:first-child {
                float: left;
                width: 70px;
              }
            }
          }

          .switch input {
            opacity: 0;
            width: 0;
            height: 0;
          }

          .slider {
            position: absolute;
            width: 30px !important;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            -webkit-transition: .4s;
            transition: .4s;
          }

          .slider:before {
            position: absolute;
            content: "";
            height: 15px;
            width: 15px;
            left: 4px;
            bottom: 2.5px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
          }

          input:checked+.slider {
            background-color: #2196F3;
          }

          input:focus+.slider {
            box-shadow: 0 0 1px #2196F3;
          }

          input:checked+.slider:before {
            -webkit-transform: translateX(10px);
            -ms-transform: translateX(10px);
            transform: translateX(10px);
          }

          .slider.round {
            border-radius: 34px;
          }

          .slider.round:before {
            border-radius: 50%;
          }
        }

        .empty-text {
          font-size: 20px;
          margin: auto;
        }

        &:hover {
          border: 1px dashed $primary;
          background: #fff;
        }
      }

      .divider {
        font-size: 25px;
        height: 2rem;
        margin: 0;
        padding: 0;
      }

      .button-group {
        width: 80%;
        // margin: 0 auto;
        display: flex;
        justify-content: space-evenly;

        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 1.5rem;

        button {
          border: none;
          border-radius: 5px;
          height: 2.5rem;
          font-size: 1.1rem;
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
    transform: translate(-50%, -50%) scale(1.03);
  }

  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}


.listTransition-enter-from {
  opacity: 0;
  transform: scale(0);
}

.listTransition-enter-to {
  opacity: 1;
  transform: scale(1);
}

.listTransition-enter-active {
  transition: all 0.5s ease;
}

.listTransition-leave-from {
  opacity: 1;
  transform: scale(1);
}

.listTransition-leave-to {
  opacity: 0;
  transform: scale(0);
}

.listTransition-leave-active {
  transition: all .4s ease;
  position: absolute;
}

.listTransition-move {
  transition: all 0.3s ease;
}
</style>
  


