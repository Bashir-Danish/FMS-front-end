<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { mainStore } from '@/stores/main';
import { type Semester, type Department } from '@/types/model';
import { Icon } from "@vicons/utils";
import { Delete24Regular, FolderAdd28Regular, Print20Regular } from "@vicons/fluent";
import * as XLSX from 'xlsx';
import {
  ArrowSync24Regular
} from "@vicons/fluent";


const useMain = mainStore();
const semesterDrop = ref(false)
const departmentDrop = ref(false)
const semFilterDrop = ref(false)
const depFilterDrop = ref(false)

const loader = ref(false)


const depFilterText = ref()
const semFilterText = ref()


const formData = ref({
  department_id: 0,
  semester_id: 0,
  grades: <any>[]
});

const showCreateForm = ref(false);
const showUpdateForm = ref(false);

const selectedRecord = ref<any>([]);


////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
const handleFileUpload = (event: any) => {
  const file = event.target?.files[0];
  // console.log(file)

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as ArrayBuffer;
      if (result) {
        const data = new Uint8Array(result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        formData.value.grades = XLSX.utils.sheet_to_json(sheet);

        console.log(formData.value.grades)

        // excelData.value = jsonData;
      }
    };
    reader.readAsArrayBuffer(file);
  }

};
const processExcelData = async () => {
  loader.value = true
  if (formData.value.department_id && formData.value.semester_id) {

    if (formData.value.grades.length > 0) {
      try {
        await useMain.importGrade(formData.value.department_id, formData.value.semester_id, formData.value.grades);
        closeForm()
        let res = await useMain.fetchEnrolls(useMain.enrollDepId, useMain.enrollSemId)
        setTimeout(() => {
          useMain.enrollments.enrollment = res.enrollments
          useMain.enrollments.subjects = res.subjects
          console.log(useMain.enrollments.enrollment)
          loader.value = false
        }, 50);
      } catch (error) {
        console.error("Error sending grade import request:", error);
      }
    } else {
      useMain.setMessage("وارد نمودن نمرات", "نمره یی وجود ندارد", false)

    }
  } else {
    useMain.setMessage("وارد نمودن نمرات", "لطفا حتما دیپارتمنت و سمستر را انتخاب کنید", false)

  }
};
const departmentData = computed(() => {
  if (depFilterText.value) {
    const searchLowerCase = depFilterText.value.toLowerCase();
    return useMain.departments.filter((item) => {
      const nameMatch = item.name?.toLowerCase().includes(searchLowerCase);
      return nameMatch;
    });
  }
  return useMain.departments;
});
const semesterData = computed(() => {
  if (semFilterText.value) {
    const searchLowerCase = semFilterText.value.toLowerCase();
    return useMain.semesters.filter((item) => {
      const nameMatch = item.name?.toLowerCase().includes(searchLowerCase);
      const yearMatch = item.year.toString().includes(searchLowerCase);
      const numberMatch = item.semester_number
        .toString()
        .includes(searchLowerCase);
      return nameMatch || yearMatch || numberMatch;
    });
  }
  return useMain.semesters;
});
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
const translateSemesterNumber = (number: number) => {
  const translations = ["اول", "دوم", "سوم", "چهارم", "پنجم", "ششم", "هفتم", "هشتم"];

  if (number >= 1 && number <= 8) {
    return translations[number - 1];
  } else {
    return "نامعلوم";
  }
}
const filterByDep = async (department: Department) => {
  loader.value = true
  depFilterText.value = ''
  useMain.enrollDepId = department.department_id
  let res = await useMain.fetchEnrolls(useMain.enrollDepId, useMain.enrollSemId)
  // formData.value.department_id = department.department_id;
  setTimeout(() => {
    useMain.enrollments.enrollment = res.enrollments
    useMain.enrollments.subjects = res.subjects
    loader.value = false
  }, 1200);
}
const filterBySem = async (semester: Semester) => {
  loader.value = true

  semFilterText.value = ''
  useMain.enrollSemId = semester.semester_id
  let res = await useMain.fetchEnrolls(useMain.enrollDepId, useMain.enrollSemId)
  // formData.value.semester_id = semester.semester_id;
  setTimeout(() => {
    useMain.enrollments.enrollment = res.enrollments
    useMain.enrollments.subjects = res.subjects
    loader.value = false
  }, 1200);
}
const refresh = async () => {
  loader.value = true;
  let res = await useMain.fetchEnrolls(useMain.enrollDepId, useMain.enrollSemId)
  setTimeout(() => {
    useMain.enrollments.enrollment = res.enrollments
    useMain.enrollments.subjects = res.subjects
    console.log(useMain.enrollments.enrollment)
    loader.value = false
  }, 1200);
};
const closeForm = () => {
  selectedRecord.value = null;

  useMain.departmentSTR = ''
  useMain.semesterSTR = ''
  showCreateForm.value = false;
  showUpdateForm.value = false;
};
const selectDepartement = (department: Department) => {
  useMain.departmentSTR = department.name
  formData.value.department_id = department.department_id;
}
const selectSemester = (semester: Semester) => {
  useMain.semesterSTR = semester.semester_number + " " + semester.name + " " + semester.year;
  formData.value.semester_id = semester.semester_id;
}
const selectedSemData = computed(() => {
  return useMain.semesters.find(sem => sem.semester_id ===
    useMain.enrollSemId)
});

/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
function generateAndDownloadExcel(data: any) {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Create a worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Enrollments');

  // Create a blob containing the workbook's data
  const arrayBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
  const uint8Array = new Uint8Array(arrayBuffer);
  const blob = new Blob([uint8Array], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  // Create a download link and trigger the download
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'enrollments.xlsx';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}


const excelData = computed(() => {
  const enrollments = useMain.enrollments.enrollment;

  if (Array.isArray(enrollments)) {
    return enrollments.map((enrollment) => {
      const row: Record<string, any> = {
        ssid: enrollment.ssid,
        name: enrollment.name,
        fname: enrollment.fname,
      };
      enrollment.grades.forEach((grade: any) => {
        row[grade.subject_name] = grade.grade === null ? 0 : grade.grade;
      });
      row['percentage'] = enrollment.percentage;
      return row;
    });
  } else {

    return [];
  }
});

watch(() => useMain.semesters, () => {
  useMain.enrollDepId = useMain.departments?.[0]?.department_id;
  useMain.enrollSemId = useMain.semesters?.[0]?.semester_id;
  console.log(useMain.enrollDepId);
  console.log(useMain.enrollSemId);
})

onMounted(() => {
  // console.log(useMain.enrollDepId);
  // console.log(useMain.enrollSemId);
});
</script>
<template>
  <div>
    <div v-if="showCreateForm || showUpdateForm" class="dark-container" @click="closeForm"></div>
    <TransitionGroup name="bounce">
      <div v-if="showCreateForm || showUpdateForm" class="enroll-form-overlay">
        <div class="enroll-form">
          <h2 v-if="showCreateForm">وارد کردن نمرات</h2>
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
                      <li v-for="semester in useMain.semesterData" :key="semester.semester_id"
                        @click.self="selectSemester(semester)">
                        <span @click.self="selectSemester(semester)">{{ translateSemesterNumber(semester.semester_number)
                        }} {{ semester.name }} {{ semester.year }}</span>
                      </li>
                    </ul>
                  </TransitionGroup>
                </div>
              </div>
            </div>
            <div class="input-group xlsx">
              <label for="xlsx">سمستر:</label>
              <input id="xlsx" type="file" @change="handleFileUpload"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
            </div>

            <div class="button-group">
              <button type="button" @click="processExcelData">ذخیره</button>
              <button @click="closeForm" type="button">لغو</button>
            </div>
          </form>
        </div>
      </div>
    </TransitionGroup>
    <div class="semesters-list">
      <div class="header1">
        <span id="name"> لیست نمرات
          <span>{{ useMain.departments.find(dept => dept.department_id ===
            useMain.enrollDepId)?.name }}</span>
          سمستر
          <span>
            {{ selectedSemData?.semester_number ? translateSemesterNumber(selectedSemData?.semester_number) : 'N/A' }}
          </span>
          <span>{{ selectedSemData?.name }} </span> سال
          <span>{{ selectedSemData?.year }} ه ش</span>
        </span>
        <span id="filters">
          <div class="input-group">
            <div class="select-o">
              <input id="dep" type="text" v-model="depFilterText" @focus="depFilterDrop = true"
                @blur="depFilterDrop = false" placeholder="جستجوی دیپارتمنت" required autocomplete="false">
              <TransitionGroup name="list" appear>
                <ul class="select-ul" v-if="depFilterDrop">
                  <li v-for="department in departmentData" :key="department.department_id"
                    @click.self="filterByDep(department)">{{ department.name }}
                  </li>
                </ul>
              </TransitionGroup>
            </div>
          </div>
          <div class="input-group">
            <!-- <div class="select-o"> -->
            <input id="semester" type="text" v-model="semFilterText" @focus="semFilterDrop = true"
              @blur="semFilterDrop = false" placeholder="جستجوی سمستر" required autocomplete="false">
            <TransitionGroup name="list" appear>
              <ul class="select-ul" v-if="semFilterDrop">
                <li v-for="(semester, index) in semesterData" :key="index" @click="filterBySem(semester)">
                  {{ translateSemesterNumber(semester.semester_number) }} {{
                    semester.name }} {{ semester.year }}
                </li>
              </ul>
            </TransitionGroup>
            <!-- </div> -->
          </div>
        </span>
        <span id="add-sem-buttons">
          <button @click="refresh">
            <Icon>
              <ArrowSync24Regular />
            </Icon>
          </button>
          <button @click="showCreateForm = true">
            <Icon>
              <FolderAdd28Regular />
            </Icon>
          </button>
          <button @click="generateAndDownloadExcel(excelData)">
            <!-- <Icon>
              <Print20Regular />
            </Icon> -->
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"></path><path d="M7 11l5 5l5-5"></path><path d="M12 4v12"></path></g></svg>
          </button>
        </span>
      </div>
      <div class="header2">
        <span id="num">
          شماره
        </span>
        <span id="name">
          مشخصات محصل
        </span>
        <span id="subjects">
          <ul>
            <li v-for="(subject, index) in useMain.enrollments.subjects" :key="index">{{ subject.subject_name }}</li>
          </ul>
        </span>
        <span id="percent">
          فیصدی
        </span>
      </div>
      <div class="loader" v-if="loader">
        <div class="fulfilling-square-spinner">
          <div class="spinner-inner"></div>
        </div>
      </div>
      <ul v-if="useMain.enrollments.enrollment.length > 0">
        <li v-for="(enroll, index) in useMain.enrollments.enrollment" :key="index" class="item">
          <div class="list-item-content">
            <span class="number">{{ index + 1 }}</span>
            <div class="student-details">
              <p class="student-id"> آیدی : {{ enroll.ssid }}</p>
              <p class="student-name">نام : {{ enroll.name }}</p>
              <p class="student-fname">نام پدر: {{ enroll.fname }} </p>
              <p class="student-dep">دیپارتمنت : {{ enroll.department_name }}</p>
            </div>
            <ul class="subject-list">
              <li v-for="(grade, Index) in enroll.grades" :key="Index">
                <p class="subject-name">{{ grade.grade }}</p>
                <p class="subject-credit">{{ grade.credit }}</p>
              </li>

            </ul>
            <p class="percent">{{ enroll.percentage }}%</p>
            <!-- <div class="edit-sem-buttons">
              <button>
                <Icon size="20" color="green">
                  <PencilOutline />
                </Icon>
              </button>
              <button>
                <Icon size="20" color="red">
                  <Delete24Regular />
                </Icon>
              </button>
            </div> -->
          </div>
        </li>
      </ul>
      <p v-else class="empty-list-message">خالی.</p>
    </div>

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
  .empty-list-message {
    margin: auto auto;
  }

  @include hideScrollbar();

  &:hover {
    @include scrollbar();
  }

  .header1 {
    display: flex;
    align-items: center;
    // justify-content: center;
    padding: 0.5rem .8rem;
    // box-shadow: 0 4px 2px -2px rgba(31, 38, 135, 0.17);
    background-color: #FAFBFF;
    // background-color: #242c4d;
    font-size: 1.1rem;
    z-index: 2;
    // border-radius: 5px;





    #name {
      width: 45%;
      padding: 0 .5rem;
      display: flex;
      justify-content: space-evenly;

    }

    #filters {
      width: 50%;
      display: flex;
      justify-content: left;
      z-index: 100;

      .input-group {
        display: flex;
        margin-left: 1rem;
        // flex-direction: column;

        // margin: 0 auto;
        &:first-child {
          width: 33%;
          // background-color: aqua;
        }

        &:last-child {
          width: 33%;
          // background-color: rgb(255, 238, 0);
        }



        input {
          width: 100%;
          padding: 0.5rem 0.8em;
          border-radius: 6px;
          font-size: 1rem;
          text-align: right;
          border: none;
          outline: none;
          border: 1px solid lighten($color-border, 5%);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          &:focus {
            border-bottom: $primary 1px solid;
          }
        }

        // .select-o {

        // }
        position: relative;

        .select-ul {
          max-height: 10rem;
          position: absolute;
          top: 2.3rem;
          width: 100%;
          background: rgba(255, 255, 255, 1);
          box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          padding: 0;
          margin: 0;

          li {
            text-align: center;
            max-height: 1.8em;
            height: 1.8em;
            cursor: pointer;
          }
        }


      }


    }

    #add-sem-buttons {
      display: flex;
      justify-content: center;
      width: 15%;

      button {
        background-color: transparent;
        border-radius: 5px;
        font-size: 30px;
        width: 35px;
        height: 100%;
        // border: 1px solid $dOp-1;
        border: none;
        outline: none;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $dOp-3;
        margin: 0 auto;
        cursor: pointer;

        &:hover {
          color: $primary;
        }
      }
    }
  }

  .header2 {
    display: flex;
    align-items: center;
    // justify-content: center;
    // padding: 0.2rem .8rem;
    padding: 0.4rem 1rem;

    box-shadow: 0 4px 2px -2px rgba(31, 38, 135, 0.17);
    width: 100%;
    background-color: #FAFBFF;
    font-size: 1rem;
    z-index: 1;
    border-radius: 5px;

    #num {
      width: 8%;
      padding: 0 1rem;
    }

    #name {
      width: 13%;
      padding: 0 .5rem;

    }

    #subjects {
      width: 72%;

      ul {
        display: flex;
        padding: 0;

        li {

          width: 7rem;
          min-width: 4rem;
          max-width: 7rem;
          height: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          border-right: 1px solid lighten($color-border, 5%);

          text-align: center;
          // margin-left: 1rem;
        }
      }
    }

    #percent {
      text-align: center;
      width: 7%;
    }


    // #add-sem-buttons {
    //   display: flex;
    //   justify-content: center;
    //   width: 10%;

    //   button {
    //     background-color: #fff;
    //     border-radius: 5px;
    //     font-size: 25px;
    //     width: 30px;
    //     height: 100%;
    //     border: 1px solid $dOp-1;
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     color: $dOp-2;
    //     margin: 0 auto;
    //     cursor: pointer;

    //     &:hover {
    //       color: $primary;
    //     }
    //   }
    // }
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
      padding: 1rem;
      background: rgba(255, 255, 255, 0.3);
      box-shadow: 0 2px 2px 0 rgba(31, 38, 135, 0.17), 0 -2px 2px 0 rgba(116, 119, 156, 0.085);
      backdrop-filter: blur(0px);
      -webkit-backdrop-filter: blur(0px);
      border-radius: 10px;
      width: 100%;

      .list-item-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;

        .number {
          width: 8%;
          padding: 0 1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .student-details {
          width: 13%;
          padding: 0 .5rem;
          height: 100%;

          // font-size: 16px;
          p {
            width: 100%;
            text-align: right;
            padding: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .subject-list {
          display: flex;
          // flex-wrap: wrap;
          width: 72%;
          padding: 0;
          margin: 0;

          li {
            // font-size: 16px;
            // text-align: center;

            width: 7rem;
            min-width: 4rem;
            max-width: 7rem;

            // &:first-child {
            border-right: 1px solid lighten($color-border, 5%);
            text-align: center;
            // margin-left: 1rem;
            // }
          }
        }

        .percent {
          width: 7%;
          text-align: center;
        }





        // .edit-sem-buttons {
        //   width: 10%;
        //   display: flex;
        //   justify-content: center;

        //   button {
        //     background-color: transparent;
        //     border: none;
        //     // margin-left: 1rem;
        //     cursor: pointer;
        //   }

        // }
      }
    }
  }

}

.loader {
  width: 100%;
  height: calc(100vh - 6.5em);
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  // background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  z-index: 100;
  align-items: center;
  justify-content: center;

  .fulfilling-square-spinner,
  .fulfilling-square-spinner * {
    box-sizing: border-box;
  }

  .fulfilling-square-spinner {
    height: 40px;
    width: 40px;
    position: relative;
    border: 3px solid $primary;
    animation: fulfilling-square-spinner-animation 4s infinite ease;
  }

  .fulfilling-square-spinner .spinner-inner {
    vertical-align: top;
    display: inline-block;
    background-color: $primary;
    width: 100%;
    opacity: 1;
    animation: fulfilling-square-spinner-inner-animation 2s infinite ease-in;
  }

  @keyframes fulfilling-square-spinner-animation {
    0% {
      transform: rotate(0deg);
    }

    25% {
      transform: rotate(180deg);
    }

    50% {
      transform: rotate(180deg);
    }

    75% {
      transform: rotate(360deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes fulfilling-square-spinner-inner-animation {
    0% {
      height: 0%;
    }

    25% {
      height: 0%;
    }

    50% {
      height: 100%;
    }

    75% {
      height: 100%;
    }

    100% {
      height: 0%;
    }
  }
}

.enroll-form-overlay {
  position: absolute;
  height: 23rem;
  max-height: 23rem;
  width: 33rem;
  min-width: 33rem;
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

  .enroll-form {
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
            position: absolute;
            width: 100%;
            background: rgba(255, 255, 255, 1);
            box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            max-height: 6em;
            overflow-y: scroll;
            list-style-type: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            @include scrollbar();

            li {
              height: 2em;
              width: 100%;
              display: flex;
              justify-content: space-evenly;
              cursor: pointer;

              &:hover {
                background: rgba(255, 255, 255, 1);
              }

              span {
                height: 100%;
              }
            }
          }
        }
      }

      .xlsx {
        width: 60%;
        margin: 0 auto;

        input {
          width: 100%;
          padding: 0.5rem 0.8em;
          border-radius: 6px;
          font-size: 1rem;
          text-align: right;
          border: none;
          outline: none;
          border: 1px solid lighten($color-border, 5%);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          &:focus {
            border-bottom: $primary 1px solid;
          }
        }

        input[type=file]::file-selector-button {

          padding: .5em .4em;
          border-radius: .2em;
          border: 1px solid lighten($color-border, 5%);

          background-color: transparent;
          transition: .3s;
        }

        input[type=file]::file-selector-button:hover {
          background-color: $dOp-1 ;
          // border: 2px solid #00cec9;
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
  .student-details-list {
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
  