import { defineStore } from "pinia";
import axios from "@/plugins/axios";
import { AxiosError } from "axios";
import { type User } from "@/types/model";
import jwtUtil from "@/utils/jwt";
import { ref } from "vue";
import { mainStore } from "@/stores/main";
// Types for the store state
// interface User {
//   user_id: number;
//   department_id: number;
//   name: string;
//   lastName: string;
//   email: string;
//   password: string;
//   userType: 'Admin' | 'instructor';
// }

interface AuthState {
  isLoggedIn: { type: boolean; default: false };
  user: { type: User | null; default: null };
  errorMassage: { type: string; default: "hello" };
}

export const useAuthStore = defineStore("auth", () => {
  const isLoggedIn = ref<AuthState>();
  const users = ref<User[]>([]);
  const sideBar = "false";
  const File = ref<any[]>([]);
  const useMain = mainStore();

  async function getAllUsers() {
    try {
      const response = await axios.get("/users");
      users.value = response.data.users;
    } catch (error) {
      console.error("Error retrieving users:", error);
    }
  }

  async function createUser(data: any) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("userType", data.userType);
    const filesToUpload = [...File.value];
    filesToUpload.forEach((e) => {
      formData.append("file", e);
    });
    try {
      const res = await axios.post("/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res?.status === 201) {
        users.value.push({
          user_id: res.data.user.user_id,
          name: res.data.user.name,
          lastName: res.data.user.lastName,
          email: res.data.user.email,
          userType: res.data.user.userType,
          picture: res.data.user.picture,
        });

        useMain.setMessage("کاربر", res.data.message, true);
        File.value = [];
      }

      // console.log("User registration response:", res.data);
    } catch (error: any) {
      useMain.setMessage("کاربر", error.response.data.error, false);
      console.error("Error creating user:", error);
    }
  }

  async function updateUser(data: any) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("userType", data.userType);
    const filesToUpload = [...File.value];
    if (filesToUpload.length) {
      filesToUpload.forEach((e) => {
        formData.append("file", e);
      });
    }
    try {
      try {
        const res = await axios.put(`/users/${data.user_id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res?.status === 200) {
          const userIndex = users.value.findIndex((user) => user.user_id === data.user_id);
          if (userIndex !== -1) {
            users.value[userIndex].name = res.data.user.name;
            users.value[userIndex].lastName = res.data.user.lastName;
            users.value[userIndex].userType = res.data.user.userType;
            users.value[userIndex].picture = res.data.user.picture;
            users.value[userIndex].email = res.data.user.email;
          }
          useMain.setMessage("کاربر", res.data.message, true);
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  async function deleteUser(userId: number) {
    try {
      const res = await axios.delete(`/users/${userId}`);
      if (res?.status === 200) {
        users.value = users.value.filter((user) => user.user_id !== userId);
        useMain.setMessage("کاربر", res.data.message, true);
      }
      console.log(res);
      // Do something with the response data if needed
    } catch (error: any) {
      useMain.setMessage("کاربر", error.response.data.error, false);
      console.error("Error deleting user:", error);
    }
  }

  async function login(email: string, password: string) {
    try {
      const response = await axios.post("/users/login", { email, password });
      console.log(response);
      // jwtUtil.saveToken(response.token); // Save the token to local storage if needed
      // this.isLoggedIn = true;
      // this.errorMassage = '';
    } catch (error: any) {
      console.error(error.response.data.error);
      // this.isLoggedIn = false;
      // this.errorMassage = error.response?.data?.error || 'Error logging in';
    }
  }

  // async getUserById(userId: number) {
  //   try {
  //     const user = await axios.get(`/users/${userId}`);
  //     // Do something with the user data if needed
  //   } catch (error) {
  //     console.error('Error retrieving user:', error);
  //   }
  // },

  // async logout() {
  // //   jwtUtil.removeToken(); // Remove the token from local storage
  // //   this.isLoggedIn = false;
  // //   this.user = null;
  // },

  return {
    login,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    isLoggedIn,
    users,
    sideBar,
    File,
  };
});

function getFileExtension(arg0: any) {
  throw new Error("Function not implemented.");
}
// import { ref, computed } from 'vue'
// import { defineStore } from 'pinia'

// export const mainStore = defineStore('main', () => {
//   const sideBar = ref(true)

//   return { sideBar }
// })
