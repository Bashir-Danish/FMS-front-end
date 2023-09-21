import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import {
  type Department,
  type Subject,
  type Student,
  type Semester,
} from "@/types/model";
import axios from "@/plugins/axios";
import { deleteAccessTokenCookie } from "@/utils/jwt";
import { useRouter } from "vue-router";

export const mainStore = defineStore("main", () => {
  // const confirmDialog = reactive({
  //   showConfirmDialog: false,
  //   confirmDialogData: {
  //     title: '',
  //     message: '',
  //     onConfirmCallback: '',
  //   },
  // });

  const baseUrl = ref('https://api.kdanish.com');
  // const baseUrl = ref('http://localhost:5000');
  const semesterSTR = ref();
  const departmentSTR = ref();

  const sideBar = ref(true);
  const departments = ref<Department[]>([]);
  const semesters = ref<Semester[]>([]);
  const enrollments = ref({
    enrollment:<any>[],
    subjects:<any>[]
  });
  const subjectsPageRecord = ref<any[]>([]);
  const students = ref<Student[]>([]);
  const File = ref<any[]>([]);
  const subjectItems = ref<any[]>([]);

  const errorMessage = ref({
    title: "",
    message: "",
    success: false,
  });
  const router = useRouter();

  const departmentData = computed(() => {
    if (departmentSTR.value) {
      const searchLowerCase = departmentSTR.value.toLowerCase();
      return departments.value.filter((item) => {
        const nameMatch = item.name?.toLowerCase().includes(searchLowerCase);
        return nameMatch;
      });
    }
    return departments.value;
  });
  const semesterData = computed(() => {
    if (semesterSTR.value) {
      const searchLowerCase = semesterSTR.value.toLowerCase();
      return semesters.value.filter((item) => {
        const nameMatch = item.name?.toLowerCase().includes(searchLowerCase);
        const yearMatch = item.year.toString().includes(searchLowerCase);
        const numberMatch = item.semester_number
          .toString()
          .includes(searchLowerCase);
        return nameMatch || yearMatch || numberMatch;
      });
    }
    return semesters.value;
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
    } catch (error:any) {
      if (error.response.status == 401) {
        deleteAccessTokenCookie();
        router.push("/login");
      }
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
    } catch (error:any) {
      if (error.response.status == 401) {
        deleteAccessTokenCookie();
        router.push("/login");
      }
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
  async function processEnrolls(semesters: any) {
    try {
      const res = await axios.post("/semesters/enrolls", {
        semesterIdsToProcess: semesters,
      });
      if (res?.status === 200) {
        setMessage("سمستر", res.data.messages, true);
      }
    } catch (error: any) {
      // setMessage("سمستر", error.response.data.error, false);
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
  ///////////////////////////    Enrolls     /////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  // Create a new student
  async function uploadImage(filetype: string, id?: number | undefined) {
    const formData = new FormData();
    formData.append("fileType", filetype);
    console.log(id);

    if (id !== undefined) {
      formData.append("id", id.toString());
    }
    const filesToUpload = [...File.value];
    filesToUpload.forEach((e) => {
      formData.append("file", e);
    });
    console.log(formData.get("file"));

    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res?.status === 200) {
        console.log(res.data.imagePath);
        return res.data.imagePath;
      }
    } catch (error) {
      console.error("Error creating student:", error);
    }
  }

  async function fetchEnrolls(departmentId: number, semesterId: number) {
    try {
      const response = await axios.get("/enrolls", {
        params: {
          departmentId: departmentId,
          semesterId: semesterId,
        },
      });

      if (response.status === 200) {
        const enrolls = response.data;
        // console.log(enrolls);
        return enrolls;
      }
    } catch (error: any) {
      console.error("Error fetching enrolls:", error.message);
    }
  }

  async function importGrade(
    departmentId: number,
    semesterId: number,
    enrollmentsData: any
  ) {
    try {
      const response = await axios.post("/enrolls/import", {
        departmentId: departmentId,
        semesterId: semesterId,
        enrollmentsData:enrollmentsData
      });

      if (response.status === 200) {
        const enrolls = response.data;
        console.log(enrolls);
        return enrolls;
      }
    } catch (error: any) {
      console.error("Error fetching enrolls:", error.message);
    }
  }

  ////////////////////////////////////////////////////////////////////////
  ///////////////////////////    Subject     /////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  // Get all subjects
  async function getAllSubjects() {
    try {
      const res = await axios.get("/subjects");
      if (res?.status === 200) {
        subjectsPageRecord.value = res.data.subjects;
      }
    } catch (error:any) {
      if (error.response.status == 401) {
        deleteAccessTokenCookie();
        router.push("/login");
      }
      console.error("Error retrieving subjects:", error);
    }
  }

  // Create a new subject
  async function createSubject(data: any) {
    console.log(data);
    try {
      const res = await axios.post("/subjects", data);
      if (res?.status === 201) {
        // console.log(res.data);
        subjectsPageRecord.value.push(res.data.semesterWithSubjects);
      }
    } catch (error) {
      console.error("Error creating subject:", error);
    }
  }

  // Update a subject
  async function updateSubject(data: any) {
    try {
      const res = await axios.put(`/subjects/${data.subject_id}`, {
        name: data.name,
        credit: data.credit,
      });
      if (res?.status === 200) {
        const subject = res.data.subject;

        const recordIndex = subjectsPageRecord.value.findIndex(
          (record) =>
            record.department_id === data.department_id &&
            record.semester_id === data.semester_id
        );
        if (recordIndex !== -1) {
          const subjectIndex = subjectsPageRecord.value[
            recordIndex
          ].subjects.findIndex(
            (subject: any) => subject.subject_id === data.subject_id
          );

          if (subjectIndex !== -1) {
            subjectsPageRecord.value[recordIndex].subjects[
              subjectIndex
            ].subject_name = data.name;
            subjectsPageRecord.value[recordIndex].subjects[
              subjectIndex
            ].credit = data.credit;
          }
        }
        return subject;
      }
    } catch (error) {
      console.error("Error updating subject:", error);
    }
  }

  // Delete a subjects
  async function deleteSubjectsBySemester(
    semesterId: number,
    departmentId: number
  ) {
    try {
      const res = await axios.delete(`/subjects/${semesterId}/${departmentId}`);
      if (res?.status === 200) {
        subjectsPageRecord.value = subjectsPageRecord.value.filter((s) => {
          return !(
            s.semester_id === semesterId && s.department_id === departmentId
          );
        });
      }
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  }
  // Delete a subject
  async function deleteSubjectById(
    subjectId: number,
    sem_id: number,
    dep_id: number
  ) {
    try {
      const res = await axios.delete(`/subjects/${subjectId}`);
      if (res?.status === 200) {
        const semesterIndex = subjectsPageRecord.value.findIndex(
          (item) => item.department_id === dep_id && item.semester_id === sem_id
        );
        if (semesterIndex !== -1) {
          subjectsPageRecord.value[semesterIndex].subjects =
            subjectsPageRecord.value[semesterIndex].subjects.filter(
              (subject: any) => subject.subject_id !== subjectId
            );
        }
      }
    } catch (error: any) {
      setMessage("محصل", error.response.data.error, false);
      console.error("Error deleting student:", error);
    }
  }

  async function addSubjectToRecord(subjectData: any) {
    try {
      const res = await axios.post("/subjects/new", subjectData);
      if (res?.status === 201) {
        const subject = res.data.subject;

        const recordIndex = subjectsPageRecord.value.findIndex(
          (record) =>
            record.department_id === subjectData.department_id &&
            record.semester_id === subjectData.semester_id
        );
        if (recordIndex !== -1) {
          subjectsPageRecord.value[recordIndex].subjects.push(subject);
        }
        return subject;
      }
    } catch (error) {
      console.error("Error adding subject:", error);
    }
  }

  ////////////////////////////////////////////////////////////////////////
  ///////////////////////////    Student     /////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  // Get all students
  async function getAllStudents() {
    try {
      let response = await axios.get("/students");
      students.value = response.data.students;
    } catch (error:any) {
      if (error.response.status == 401) {
        deleteAccessTokenCookie();
        router.push("/login");
      }
      console.error("Error retrieving students:", error);
    }
  }

  // Create a new student
  async function createStudent(data: Student) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("fname", data.fname);
    formData.append("ssid", data.ssid.toString());
    formData.append("department_id", data.department_id.toString());
    formData.append("current_semester", data.current_semester.toString());
    formData.append("imagePath", data.picture.toString());

    try {
      const res = await axios.post("/students", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res?.status === 201) {
        students.value.push({
          student_id: res.data.student.student_id,
          name: res.data.student.name,
          fname: res.data.student.fname,
          ssid: res.data.student.ssid,
          department_id: res.data.student.department_id,
          picture: res.data.student.picture,
          current_semester: res.data.student.current_semester,
        });
        console.log(res.data);
      }
    } catch (error) {
      console.error("Error creating student:", error);
    }
    File.value = [];
  }

  // Update a student
  async function updateStudent(data: Student) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("fname", data.fname);
    formData.append("ssid", data.ssid.toString());
    formData.append("department_id", data.department_id.toString());
    formData.append("current_semester", data.current_semester.toString());
    formData.append("imagePath", data.picture.toString());

    try {
      const res = await axios.put(`/students/${data.student_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res?.status === 200) {
        const Index = students.value.findIndex(
          (student) => student.student_id === data.student_id
        );
        if (Index !== -1) {
          students.value[Index].name = res.data.student.name;
          students.value[Index].fname = res.data.student.fname;
          students.value[Index].ssid = res.data.student.ssid;
          students.value[Index].department_id = res.data.student.department_id;
          students.value[Index].picture = res.data.student.picture;
          students.value[Index].current_semester =
            res.data.student.current_semester;
        }
        setMessage("محصل", res.data.message, true);
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  }

  // Delete a student
  async function deleteStudent(student_id: number) {
    try {
      const res = await axios.delete(`/students/${student_id}`);
      if (res?.status === 200) {
        students.value = students.value.filter(
          (student) => student.student_id !== student_id
        );
        setMessage("محصل", res.data.message, true);
      }
      console.log(res);
    } catch (error: any) {
      setMessage("محصل", error.response.data.error, false);
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
    deleteSubjectsBySemester,
    getAllStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    setMessage,
    addSubjectToRecord,
    deleteSubjectById,
    processEnrolls,
    fetchEnrolls,
    uploadImage,
    importGrade,
    baseUrl,
    sideBar,
    departments,
    semesters,
    subjectsPageRecord,
    students,
    errorMessage,
    File,
    semesterSTR,
    departmentSTR,
    semesterData,
    departmentData,
    subjectItems,
    enrollments
    // openConfirmDialog,
    // closeConfirmDialog,
    // confirmDialog
  };
});
