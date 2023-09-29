<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { mainStore } from '@/stores/main';
import { type Semester, type Department } from '@/types/model';
import { Icon } from "@vicons/utils";
import { Delete24Regular } from "@vicons/fluent";
import subjectItems from "@/components/smallcomponents/subjectItems.vue"
import BaseInput from "@/components/smallcomponents/baseinput.vue";
import {
  Add,
  PencilOutline,
} from "@vicons/ionicons5";
const useMain = mainStore();
const semesterDrop = ref(false)
const departmentDrop = ref(false)

const formData = ref({
  department_id: 0,
  semester_id: 0,
  subjects: <any>[]
});
const sbjFormData = ref({
  subject_id: 0,
  credit: 0,
  name: '',
  department_id: 0,
  semester_id: 0
});
const showCreateForm = ref(false);
const showUpdateForm = ref(false);

const selectedRecord = ref<any>([]);
const selectedSubject = ref();

const showSubjectCreateForm = ref(false);
const showSubjectUpdateForm = ref(false);

const handleRecordUpdate = (subject: any) => {
  selectedRecord.value = subject;
  showUpdateForm.value = true;
};
const handleCreateSubject = () => {
  sbjFormData.value.name = ''
  sbjFormData.value.credit = 0
  showSubjectCreateForm.value = true
}
const handleSubjectUpdate = (subject: any, dep_id: number, sem_id: number) => {
  selectedSubject.value = subject;
  selectedSubject.value.department_id = dep_id;
  selectedSubject.value.semester_id = sem_id;
  sbjFormData.value.name = subject.subject_name;
  sbjFormData.value.credit = subject.credit;
  showSubjectUpdateForm.value = true;
};
const createSingleSubject = async (dep_id: number, sem_id: number) => {
  if (showSubjectCreateForm.value) {
    try {
      let data = {
        department_id: dep_id,
        semester_id: sem_id,
        name: sbjFormData.value.name,
        credit: sbjFormData.value.credit
      }
      await useMain.addSubjectToRecord(data);
      showSubjectCreateForm.value = false
      sbjFormData.value.name = ''
      sbjFormData.value.credit = 0

    } catch (error) {
      console.error('Error creating user:', error);
    }
  } else if (selectedSubject.value && showSubjectUpdateForm.value) {
    try {
      let data = {
        subject_id: selectedSubject.value.subject_id,
        name: sbjFormData.value.name,
        credit: sbjFormData.value.credit,
        department_id: dep_id,
        semester_id: sem_id,
      }

      await useMain.updateSubject(data);
      showSubjectUpdateForm.value = false
      sbjFormData.value.name = ''
      sbjFormData.value.credit = 0
    } catch (error) {
      console.error('Error updating user:', error);
    }
    // formData.value.name = ''
    // formData.value.fname = ''
    // formData.value.ssid = 0
    // formData.value.department_id = 0
  }
};
const handleSubmit = async () => {
  if (showCreateForm.value) {
    try {
      formData.value.subjects = useMain.subjectItems;
      await useMain.createSubject(formData.value);
      closeForm();
    } catch (error) {
      console.error('Error creating semester:', error);
    }
  }
};
const handleDelete = async (semesterId: number, departmentId: number) => {
  const shouldDelete = window.confirm("Are you sure you want to delete this all ?");
  if (shouldDelete) {
    try {
      await useMain.deleteSubjectsBySemester(semesterId, departmentId);
    } catch (error) {
      console.log(error);
    }
  }
};
const deleteSingleSubject = async (item_id: number, semester_id: number, department_id: number) => {
  const shouldDelete = window.confirm("Are you sure you want to delete this subject ?");
  if (shouldDelete) {
    try {
      await useMain.deleteSubjectById(item_id, semester_id, department_id);
      selectedRecord.value.subjects.filter((s: any) => s.subject_id !== item_id)
    } catch (error) {
      console.log(error);
    }
  }
};
const closeForm = () => {
  selectedRecord.value = null;
  formData.value = {
    semester_id: 0,
    department_id: 0,
    subjects: []
  };
  useMain.departmentSTR = ''
  useMain.semesterSTR = ''
  useMain.subjectItems = []
  showCreateForm.value = false;
  showUpdateForm.value = false;
};
const translateSemesterNumber = (number: number) => {
  const translations = ["اول", "دوم", "سوم", "چهارم", "پنجم", "ششم", "هفتم", "هشتم"];

  if (number >= 1 && number <= 8) {
    return translations[number - 1];
  } else {
    return "نامعلوم";
  }
}
const selectDepartement = (department: Department) => {
  useMain.departmentSTR = department.name
  formData.value.department_id = department.department_id;
}
const selectSemester = (semester: Semester) => {
  useMain.semesterSTR = semester.semester_number + " " + semester.name + " " + semester.year;
  formData.value.semester_id = semester.semester_id;
}
onMounted(async () => {
  // await useMain.getAllSubjects();
  // await useMain.getAllSemesters();
});
</script>
<template>

    <div v-if="showCreateForm || showUpdateForm" class="dark-container" @click="closeForm">
    </div>
    <TransitionGroup name="bounce">
      <div v-if="showCreateForm || showUpdateForm" class="semester-form-overlay">
        <div class="semester-form">
          <h2 v-if="showCreateForm">افزدون مضامین</h2>
          <h2 v-if="showUpdateForm"> ویرایش مضامین</h2>
          <form v-if="showCreateForm">
            <div class="input-groups">
              <div class="input-group">
                <label for="dep">دیپارتمنت:</label>
                <div class="select-o">
                  <input id="dep" type="text" v-model="useMain.departmentSTR" @focus="departmentDrop = true"
                    @blur="departmentDrop = false" placeholder="دیپارتمنت مربوطه را انتخاب کنید" required
                    autocomplete="false">
                  <TransitionGroup name="list" appear>
                    <ul class="select-ul" v-if="departmentDrop">

                      <li v-for="department in useMain.departmentData" :key="department.department_id"
                        @click.self="selectDepartement(department)">
                        <span @click.self="selectDepartement(department)">{{ department.name }}</span>
                      </li>
                    </ul>
                  </TransitionGroup>
                </div>
              </div>
              <div class="input-group">
                <label for="semester">سمستر:</label>
                <div class="select-o">
                  <input id="semester" type="text" v-model="useMain.semesterSTR" @focus="semesterDrop = true"
                    @blur="semesterDrop = false" placeholder="سمستر مربوطه را انتخاب کنید" required autocomplete="false">
                  <TransitionGroup name="list" appear>

                    <ul class="select-ul" v-if="semesterDrop">
                      <li v-for="(semester, index) in useMain.semesterData" :key="index"
                        @click="selectSemester(semester)">
                        {{ translateSemesterNumber(semester.semester_number) }} {{
                          semester.name }} {{ semester.year }}
                      </li>
                    </ul>
                  </TransitionGroup>
                </div>
              </div>
            </div>

            <div class="input-group">
              <label for="subject">مضامین:</label>
              <div>
                <subjectItems />
              </div>
            </div>

            <div class="button-group">
              <button type="button" @click="handleSubmit()">ذخیره</button>
              <button @click="closeForm" type="button">لغو</button>
            </div>
          </form>
          <div v-else class="update-container">
            <ul class="semester-details-list">
              <li>
                <p>سمستر</p>
                <p>{{ translateSemesterNumber(selectedRecord.semester_number) }}</p>
              </li>
              <li>
                <p>نوع</p>
                <p>{{ selectedRecord.semester_name }}</p>
              </li>
              <li>
                <p>سال</p>
                <p>{{ selectedRecord.year }} -ه ش</p>
              </li>
              <li>
                <p>دیپارتمنت</p>
                <p>{{ useMain.departments.find(dep => dep.department_id ===
                  selectedRecord.department_id)?.name }}</p>
              </li>
            </ul>
            <span id="add-btn">
              <button @click="handleCreateSubject()">
                <Icon>
                  <Add />
                </Icon>
              </button>
            </span>
            <form class="subject-from" v-if="showSubjectCreateForm || showSubjectUpdateForm">
              <!-- <h3 v-if="showSubjectCreateForm">افزدون مضمون</h3>
              <h3 v-if="showSubjectUpdateForm">ویرایش مضمون</h3> -->
              <BaseInput v-model="sbjFormData.name" input-type="text" input-id="نام:" :is-required="true"
                placeholder="نام را وارد کنید" />
              <BaseInput v-model="sbjFormData.credit" input-type="number" input-id="کردیت:" :is-required="true"
                placeholder="کردیت را وارد کنید" />

              <div class="buttons">
                <button type="button"
                  @click="createSingleSubject(selectedRecord.department_id, selectedRecord.semester_id)">{{
                    showSubjectCreateForm ? 'ذخیره' : 'ویرایش' }}</button>
                <button @click="showSubjectCreateForm = false, showSubjectUpdateForm = false" type="button">لغو</button>
              </div>
            </form>
            <ul class="edit-subject-ul" v-else>
              <transition-group name="specList">
                <li v-for="item in selectedRecord.subjects" :key="item">
                  <span>{{ item.subject_name }}</span>
                  <span>{{ item.credit }}</span>
                  <span class="edit"
                    @click="handleSubjectUpdate(item, selectedRecord.department_id, selectedRecord.semester_id)">
                    <Icon color="green">
                      <PencilOutline />
                    </Icon>
                  </span>
                  <span class="trash"
                    @click="deleteSingleSubject(item.subject_id, selectedRecord.semester_id, selectedRecord.department_id)">
                    <Icon color="red">
                      <Delete24Regular />
                    </Icon>
                  </span>
                </li>
              </transition-group>
            </ul>
          </div>
        </div>
      </div>
    </TransitionGroup>
    <div class="semesters-list">
      <div class="header">
        <span id="num">
          شماره
        </span>
        <span id="name">
          سمستر
        </span>
        <span id="subjects">
          مضامین
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
        <li v-for="(subject, index) in useMain.subjectsPageRecord" :key="index" class="item">
          <div class="list-item-content">
            <span class="number">{{ index + 1 }}</span>
            <div class="semester-details">
              <p class="semester-number"> سمستر : {{ translateSemesterNumber(subject.semester_number) }}</p>
              <p class="semester-number">نوع : {{ subject.semester_name }}</p>
              <p class="semester-number">سال: {{ subject.year }} -ه ش</p>
              <p class="semester-name">دیپارتمنت : {{ useMain.departments.find(dep => dep.department_id ===
                subject.department_id)?.name }}</p>
            </div>
            <ul class="subject-list">
              <li>
                <p class="subject-name">مضمون</p>
                <p class="subject-credit">کردیت</p>
              </li>
              <li v-for="(item, Index) in subject.subjects" :key="Index">
                <p class="subject-name">{{ item.subject_name }}</p>
                <p class="subject-credit">{{ item.credit }}</p>
              </li>
            </ul>
            <div class="edit-sem-buttons">
              <button @click="handleRecordUpdate(subject)">
                <Icon size="20" color="green">
                  <PencilOutline />
                </Icon>
              </button>
              <button @click="handleDelete(subject.semester_id, subject.department_id)">
                <Icon size="20" color="red">
                  <Delete24Regular />
                </Icon>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  
</template>
  
<style scoped lang="scss">
@import "@/assets/variables.scss";
@import "@/assets/mixin.scss";

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

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

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .8rem;
    box-shadow: 0 4px 2px -2px rgba(31, 38, 135, 0.17);
    background-color: #FAFBFF;
    font-size: 1.1rem;
    z-index: 1;
    border-radius: 5px;

    #num {
      width: 10%;
      padding: 0 1rem;

    }

    #name {
      width: 15%;

    }

    #subjects {
      width: 65%;

    }



    #add-sem-buttons {
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
          width: 10%;
          padding: 0 1rem;

        }

        .semester-details {
          width: 15%;
          padding: 0 .5rem;
          height: 100%;

          // font-size: 16px;
          p {
            width: 100%;
            text-align: right;
            padding: 0;
          }
        }

        .subject-list {
          display: flex;
          flex-wrap: wrap;
          width: 65%;
          padding: 0;
          margin: 0;

          li {
            // font-size: 16px;
            text-align: center;
            width: 5rem;

            &:first-child {
              border-left: 1px solid lighten($color-border, 5%);
              text-align: center;
              margin-left: 1rem;
            }
          }
        }





        .edit-sem-buttons {
          width: 10%;
          display: flex;
          justify-content: center;

          button {
            background-color: transparent;
            border: none;
            // margin-left: 1rem;
            cursor: pointer;
          }

        }
      }
    }
  }

}

.semester-form-overlay {
  position: absolute;
  height: 30rem;
  // max-height: 30rem;
  width: 35rem;
  // min-width: 35rem;
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
  z-index: 1000;


  .semester-form {
    h2 {
      text-align: center;
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .selects-group {
        display: flex;
        width: 100%;
        margin: 0 auto;
        gap: 1rem;
      }

      .input-groups {
        display: flex;
        gap: 1rem;
        padding: 0 1rem;
        margin-bottom: 1rem;
        width: 95%;
      }



      .input-group {
        display: flex;
        flex-direction: column;
        width: 90%;
        margin: 0 auto;

        input {
          width: 100%;
          padding: 0.9em 1em;
          border-radius: 6px;
          font-size: 1em;
          text-align: right;
          border: none;
          outline: none;
          border: 1px solid lighten($color-border, 5%);

          &:focus {
            border-bottom: $primary 1px solid;
          }
        }

        .select-o {
          position: relative;

          .select-ul {
            max-height: 10rem;
            position: absolute;
            top: 3rem;
            width: 100%;
            background: rgba(255, 255, 255, 1);
            box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            padding: 0;
            margin: 0;
            overflow-y: auto;
            font-size: 1rem;

            li {
              text-align: center;
              max-height: 1.8em;
              height: 1.8em;
              cursor: pointer;

            }

            @include hideScrollbar();

            &:hover {
              @include scrollbar();
            }

          }
        }
      }

      .button-group {
        width: 80%;
        display: flex;
        justify-content: space-evenly;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 1rem;

        button {
          border: none;
          border-radius: 5px;
          height: 2.5rem;
          font-size: 1.1rem;
          color: white;
          width: 30%;
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

.list-enter-from {
  transform: scaleY(0);
}

.list-enter-to {
  transform: scaleY(1);
}

.list-enter-active {
  transition: all 0.2s ease;
  transform-origin: top;
}

.list-leave-from {
  transform: scaleY(1)
}

.list-leave-to {
  transform: scaleY(0);
}

.list-leave-active {
  transition: all .3s ease;
  transform-origin: top;
}

.list-move {
  transition: all 0.3s ease;
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


///////////// update subject //////////////////
.update-container {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;

  // justify-content: center;
  // align-content: center;
  .semester-details-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 0;
    margin: 0;

    li {
      width: 7rem;
      border-left: 1px solid lighten($color-border, 5%);
      text-align: center;
      margin-left: 1rem;

      &:last-child {
        border: none;
      }
    }
  }

  #add-btn {
    margin-top: 1rem;

    button {
      background-color: #fff;
      border-radius: 5px;
      font-size: 25px;
      width: 30px;
      height: 100%;
      border: 1px solid $primary;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $primary;
      margin: 0 auto;
      cursor: pointer;

      &:hover {
        background-color: $primary;
        color: white;
      }
    }
  }

  .subject-from {
    padding: 2rem;
    width: 70%;
    margin: 0 auto;

    .buttons {
      width: 60%;
      display: flex;
      justify-content: space-evenly;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 1rem;

      button {
        border: none;
        border-radius: 5px;
        height: 2.5rem;
        font-size: 1.1rem;
        color: white;
        width: 30%;
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

  .edit-subject-ul {
    overflow-y: scroll;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    border-radius: 5px;
    min-height: 15rem;
    max-height: 15rem;
    margin: 1em 0;
    position: relative;
    list-style-type: none;
    padding: 0;

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
      height: 2.5rem;
      background: transparent;
      transition: 0.3s ease all;
      box-shadow: 0 2px 3px 0 rgba(136, 137, 138, 0.37),
        0 -1px 3px 0 rgba(160, 160, 160, 0.085);
      // border-bottom: #cccccc 1px solid;
      position: relative;
      color: rgba(0, 0, 0, 0.7);

      span {
        width: 50%;
        padding-right: 0.3em;
      }

      .trash,
      .edit {
        position: absolute;
        width: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      .trash {
        left: 1em;
      }

      .edit {
        left: 4em;
      }

      &:hover {
        background: rgba(244, 245, 247)
      }
    }
  }

}


.specList-enter-from {
  opacity: 0;
  transform: scale(0);
}

.specList-enter-to {
  opacity: 1;
  transform: scale(1);
}

.specList-enter-active {
  transition: all 0.5s ease;
}

.specList-leave-from {
  opacity: 1;
  transform: scale(1);
}

.specList-leave-to {
  opacity: 0;
  transform: scale(0);
}

.specList-leave-active {
  transition: all .4s ease;
  position: absolute;
}

.specList-move {
  transition: all 0.3s ease;
}
</style>
  