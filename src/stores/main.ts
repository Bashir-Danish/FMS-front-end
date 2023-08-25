import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import {
  type Department,
  type Subject,
  type Student,
  type Semester,
} from "@/types/model";
import axios from "@/plugins/axios";

export const mainStore = defineStore("main", () => {
  // const confirmDialog = reactive({
  //   showConfirmDialog: false,
  //   confirmDialogData: {
  //     title: '',
  //     message: '',
  //     onConfirmCallback: '',
  //   },
  // });

  const sideBar = ref(true);
  const departments = ref<Department[]>([]);
  const semesters = ref<Semester[]>([]);
  const subjects = ref<Subject[]>([]);
  const students = ref<Student[]>([]);
  const errorMessage = ref({
    title: "",
    message: "",
    success: false,
  });

  // function openConfirmDialog(data: { title: string; message: string; onConfirmCallback: string; }) {
  //   confirmDialog.showConfirmDialog= true;
  //   confirmDialog.confirmDialogData = data;
  // }
  // const closeConfirmDialog = () => {
  //   confirmDialog.showConfirmDialog = false;
  //   confirmDialog.confirmDialogData = {
  //   title: '',
  //   message: '',
  //   onConfirmCallback: '',
  // };
  // };

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////    Department     /////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  async function getAllDepartments() {
    try {
      const res = await axios.get("/departments");
      departments.value = res.data;
    } catch (error) {
      // console.error("Error retrieving departments:", error);
    }
  }

  async function createDepartment(name: string) {
    try {
      const res = await axios.post("/departments", { name: name });
      if (res?.status === 201) {
        departments.value.push({
          department_id: res.data.departmentId,
          name: name,
        });
        setMessage("دیپارتمنت", "دیپارتنمت موفقانه اضافه شد", true);
      }
    } catch (error: any) {
      setMessage("دیپارتمنت", error.response.data.error, false);
      // console.error("Error creating department:", error.response.data.error);
    }
  }

  async function updateDepartment(data: Department) {
    try {
      const res = await axios.put(`/departments/${data.department_id}`, data);
      if (res?.status === 200) {
        const updatedIndex = departments.value.findIndex(
          (dep) => dep.department_id === data.department_id
        );
        if (updatedIndex !== -1) {
          departments.value[updatedIndex] = {
            ...departments.value[updatedIndex],
            ...data,
          };
          setMessage("دیپارتمنت", "دیپارتمنت موفقانه ویرایش شد", true);
        }
      }
    } catch (error) {
      // console.error("Error updating department:", error);
    }
  }

  async function deleteDepartment(department_id: number) {
    try {
      const res = await axios.delete(`/departments/${department_id}`);
      if (res?.status === 200) {
        departments.value = departments.value.filter(
          (department) => department.department_id !== department_id
        );
        setMessage("دیپارتمنت", "دیپارتمنت موفقانه حذف شد", true);
      }
    } catch (error) {
      // console.error("Error deleting department:", error);
    }
  }

  ////////////////////////////////////////////////////////////////////////
  //////////////////////////    Semester     /////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  async function getAllSemesters() {
    try {
      const res = await axios.get("/semesters");
      semesters.value = res.data;
    } catch (error) {
      // console.error("Error retrieving semesters:", error);
    }
  }

  async function createSemester(data: {
    name: string;
    year: number;
    semester_number: number;
  }) {
    try {
      const res = await axios.post("/semesters", {
        name: data.name,
        year: data.year,
        semester_number: data.semester_number,
      });
      if (res?.status === 201) {
        semesters.value.push({
          semester_id: res.data.semesterId,
          name: data.name,
          year: data.year,
          semester_number: data.semester_number,
        });
        setMessage("سمستر", res.data.message, true);
      }
    } catch (error: any) {
      setMessage("سمستر", error.response.data.error, false);
      // console.error("Error creating semester:", error.response.data.error);
    }
  }

  async function updateSemester(data: Semester) {
    try {
      const res = await axios.put(`/semesters/${data.semester_id}`, data);
      if (res?.status === 200) {
        const updatedIndex = semesters.value.findIndex(
          (dep) => dep.semester_id === data.semester_id
        );
        if (updatedIndex !== -1) {
          semesters.value[updatedIndex] = {
            ...semesters.value[updatedIndex],
            ...data,
          };
        }
        setMessage("سمستر", res.data.message, true);
      }
    } catch (error: any) {
      setMessage("سمستر", error.response.data.error, false);
      // console.error("Error updating semesters:", error);
    }
  }

  async function deleteSemester(semester_id: number) {
    try {
      const res = await axios.delete(`/semesters/${semester_id}`);
      if (res?.status === 200) {
        semesters.value = semesters.value.filter(
          (semester) => semester.semester_id !== semester_id
        );
        setMessage("سمستر", res.data.message, true);
      }
    } catch (error) {
      console.error("Error deleting semesters:", error);
    }
  }


  ////////////////////////////////////////////////////////////////////////
  ///////////////////////////    Subject     /////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  // Get all subjects
  async function getAllSubjects() {
    try {
      subjects.value = await axios.get("/subjects");
    } catch (error) {
      console.error("Error retrieving subjects:", error);
    }
  }

  // Create a new subject
  async function createSubject(data: Subject) {
    try {
      await axios.post("/subjects", data);
    } catch (error) {
      console.error("Error creating subject:", error);
    }
  }

  // Update a subject
  async function updateSubject(data: Subject) {
    try {
      await axios.put(`/subjects/${data.subject_id}`, data);
    } catch (error) {
      console.error("Error updating subject:", error);
    }
  }

  // Delete a subject
  async function deleteSubject(subject_id: number) {
    try {
      await axios.delete(`/subjects/${subject_id}`);
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  }

  // Get all students
  async function getAllStudents() {
    try {
      students.value = await axios.get("/students");
    } catch (error) {
      console.error("Error retrieving students:", error);
    }
  }

  // Create a new student
  async function createStudent(data: Student) {
    try {
      await axios.post("/students", data);
    } catch (error) {
      console.error("Error creating student:", error);
    }
  }

  // Update a student
  async function updateStudent(data: Student) {
    try {
      await axios.put(`/students/${data.student_id}`, data);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  }

  // Delete a student
  async function deleteStudent(student_id: number) {
    try {
      await axios.delete(`/students/${student_id}`);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  }
  function setMessage(title: string, message: string, success: boolean) {
    errorMessage.value.title = title;
    errorMessage.value.message = message;
    errorMessage.value.success = success;
    setTimeout(() => {
      errorMessage.value.title = "";
      errorMessage.value.message = "";
    }, 3000);
  }

  return {
    getAllDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    getAllSubjects,

    getAllSemesters,
    createSemester,
    updateSemester,
    deleteSemester,

    createSubject,
    updateSubject,
    deleteSubject,
    getAllStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    setMessage,
    sideBar,
    departments,
    semesters,
    subjects,
    students,
    errorMessage,
    
    // openConfirmDialog,
    // closeConfirmDialog,
    // confirmDialog
  };
});
