export interface User {
  user_id: number;
  name: string;
  lastName: string;
  email: string;
  userType: string;
  picture:File | null
}

export interface Department {
  department_id: number;
  name: string;
}

export interface Semester {
  semester_id: number;
  name: string;
  year: number;
  semester_number: number;
  is_passed:number
}

export interface Student {
  student_id: number;
  name: string;
  fname: string;
  ssid: number;
  department_id: number;
  picture: string; 
  current_semester:number;
  year:number;
}


export interface Subject {
  subject_id: number;
  name: string;
  credit: number;
  department_id: number;
  semester_id:number;
}

export interface Enrollment {
  enrollment_id: number;
  student_id: number;
  subject_id: number;
  semester_id: number;
  grade: number;
}

//   interface Attendance {
//     attendance_id: number;
//     student_id: number;
//     subject_id: number;
//     date: Date;
//     status: 'Present' | 'Absent';
//     semester_id: number;
//     year: number;
//   }
