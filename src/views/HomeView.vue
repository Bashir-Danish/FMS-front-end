<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import Header from "@/components/header.vue";
import SidBar from "@/components/sidBar.vue";
import { mainStore } from "@/stores/main";
import { useAuthStore } from "@/stores/auth";
import Path from "@/components/smallcomponents/path.vue";
const useMain = mainStore();
const useAuth = useAuthStore();

const routerViewStyle = ref({
  width: `calc(100% - 13.5rem)`,
  transition: "width 0.3s",
});

const isLoading = ref(true); // Flag to control loader visibility

watch(
  () => {
    return useMain.sideBar;
  },
  () => {
    routerViewStyle.value = {
      width: useMain.sideBar ? `calc(100% - 13.5rem)` : "calc(100% - 4rem)",
      transition: "width 0.3s",
    };
  }
);

onMounted(async () => {
  isLoading.value = true; // Hide the loader when all operations are complete

  try {
    await Promise.all([
      useMain.getAllDepartments(),
      useMain.getAllSemesters(),
      useMain.getAllStudents(),
      useMain.getAllSubjects(),
      useAuth.getUserDataFromCookie(),
      useAuth.getUserInfo(),
    ]);

    const res = await useMain.fetchEnrolls(useMain.departments?.[0]?.department_id ?? 1, useMain.semesters?.[0]?.semester_id ?? 1);

    useMain.enrollments.enrollment = res.enrollments;
    useMain.enrollments.subjects = res.subjects;

    setTimeout(() => {
      isLoading.value = false;
    }, 1500);
  } catch (error) {
    console.error('Error fetching data:', error);
    setTimeout(() => {
      isLoading.value = false;
    }, 1500);
  }
});
</script>

<template>
  <div class="home-content">
    <SidBar />
    <div class="main-content" :style="routerViewStyle">
      <Header />
      <Path />
      <div class="router-view-container">

        <div class="loader" v-if="isLoading">
          <div class="looping-rhombuses-spinner">
            <div class="rhombus"></div>
            <div class="rhombus"></div>
            <div class="rhombus"></div>
          </div>
        </div>

        <router-view v-else></router-view>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "@/assets/mixin.scss";
@import "@/assets/variables.scss";

.home-content {
  position: relative;
  display: flex;
  // margin-right: 1rem;
}

.main-content {
  // width: calc(100% );
  transition: width 0.3s;
  // height: calc(100vh );
  // direction: rtl;
  // overflow-y: auto;
  // @include hideScrollbar();

  &:hover {
    @include scrollbar();
  }
}

.router-view-container {
  // overflow-y: auto;
  // height: calc(100vh - 6em);
  margin-right: .5rem;
  padding: 0 0.7rem;
  // background: rgba(255, 255, 255, 0.3);
  // box-shadow: 0 2px 3px 0 rgba(31, 38, 135, 0.37),
  // 0 -1px 3px 0 rgba(116, 119, 156, 0.085);
  // backdrop-filter: blur(0px);
  // -webkit-backdrop-filter: blur(0px);
  // border-radius: 10px;
  // border: 2px solid rgba(255, 255, 255, 0.98);
  direction: rtl;
  border-radius: 1rem;

}

.loader {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 2px 3px 0 rgba(31, 38, 135, 0.37),
    0 -1px 3px 0 rgba(116, 119, 156, 0.085);
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  z-index: 1000000;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .looping-rhombuses-spinner,
  .looping-rhombuses-spinner * {
    box-sizing: border-box;
  }

  .looping-rhombuses-spinner {
    width: calc(15px * 4);
    height: 15px;
    position: relative;
  }

  .looping-rhombuses-spinner .rhombus {
    height: 20px;
    width: 20px;
    background-color: $primary;
    left: calc(15px * 4);
    position: absolute;
    margin: 0 auto;
    border-radius: 2px;
    transform: translateY(0) rotate(45deg) scale(0);
    animation: looping-rhombuses-spinner-animation 2500ms linear infinite;
  }

  .looping-rhombuses-spinner .rhombus:nth-child(1) {
    animation-delay: calc(2500ms * 1 / -1.5);
  }

  .looping-rhombuses-spinner .rhombus:nth-child(2) {
    animation-delay: calc(2500ms * 2 / -1.5);
  }

  .looping-rhombuses-spinner .rhombus:nth-child(3) {
    animation-delay: calc(2500ms * 3 / -1.5);
  }

  @keyframes looping-rhombuses-spinner-animation {
    0% {
      transform: translateX(0) rotate(45deg) scale(0);
    }

    50% {
      transform: translateX(-233%) rotate(45deg) scale(1);
    }

    100% {
      transform: translateX(-466%) rotate(45deg) scale(0);
    }
  }
}</style>
