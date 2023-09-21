import { defineStore } from "pinia";
import axios from "@/plugins/axios";
import { AxiosError } from "axios";
import { type User } from "@/types/model";
import { deleteAccessTokenCookie } from "@/utils/jwt";
import { ref } from "vue";
import { mainStore } from "@/stores/main";
import { useRouter } from "vue-router";

interface AuthState {
  isLoggedIn: { type: boolean; default: false };
  user: { type: User | null; default: null };
  errorMassage: { type: string; default: "hello" };
}

export const useAuthStore = defineStore("auth", () => {
  const isLoggedIn = ref<AuthState>();
  const users = ref<User[]>([]);
  const sideBar = "false";

  const useMain = mainStore();
  const router = useRouter();
  const userId = ref();
  const userData = ref();

  function base64UrlDecode(base64Url: string) {
    while (base64Url.length % 4 !== 0) {
      base64Url += "=";
    }

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const rawData = atob(base64);

    try {
      return JSON.parse(rawData);
    } catch (error) {
      console.error("Error parsing JSON from JWT payload:", error);
      return null;
    }
  }

  async function getUserDataFromCookie() {
    const cookies = document.cookie.split(";");
    let user = {};

    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "access_token") {
        try {
          const parts = value.split(".");
          if (parts.length === 3) {
            const payload = base64UrlDecode(parts[1]);

            user = payload || {};
            userId.value = (user as any).userId;
          } else {
            console.error("Invalid JWT token format");
          }
        } catch (error) {
          console.error("Error parsing access token from cookie:", error);
        }
        break;
      }
    }
  }

  async function getAllUsers() {
    try {
      const response = await axios.get("/users");
      users.value = response.data.users;
    } catch (error: any) {
      if (error.response.status == 401) {
        deleteAccessTokenCookie();
        router.push("/login");
      }
      console.error("Error retrieving users:", error);
    }
  }
  async function getUserInfo() {
    try {
      const response = await axios.get(`/users/${userId.value}`);
      userData.value = response.data.user;
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
    formData.append("imagePath", data.picture);

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
        useMain.File = [];
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
    formData.append("imagePath", data.picture);

    try {
      try {
        const res = await axios.put(`/users/${data.user_id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res?.status === 200) {
          const userIndex = users.value.findIndex(
            (user) => user.user_id === data.user_id
          );
          if (userIndex !== -1) {
            users.value[userIndex].name = res.data.user.name;
            users.value[userIndex].lastName = res.data.user.lastName;
            users.value[userIndex].userType = res.data.user.userType;
            users.value[userIndex].picture = res.data.user.picture;
            users.value[userIndex].email = res.data.user.email;
          }
          console.log(res.data);
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

  async function login(email: string, password: string, remember: boolean) {
    try {
      const res = await axios.post("/users/login", {
        email,
        password,
        remember,
      });
      if (res?.status === 200) {
        router.push({ path: "/" });
      }
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
    getUserDataFromCookie,
    deleteUser,
    getUserInfo,
    isLoggedIn,
    userId,
    userData,
    users,
    sideBar,
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
