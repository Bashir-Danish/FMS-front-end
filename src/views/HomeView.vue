<script setup lang="ts">
import { ref, watch ,onMounted } from "vue";
import Header from "@/components/header.vue";
import SidBar from "@/components/sidBar.vue";
import { mainStore } from "@/stores/main";
import Path from "@/components/smallcomponents/path.vue";

const useMain = mainStore();

const routerViewStyle = ref({
  width: `calc(100% - 13.5rem)`,
  transition: "width 0.3s",
});

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
onMounted(() => {
  useMain.getAllDepartments();
});
</script>

<template>
  <div class="home-content">
    <SidBar />
    <div class="main-content" :style="routerViewStyle">
      <Header />
      <Path />
      <div class="router-view-container">
        <router-view></router-view>
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
  margin-right:.5rem;
  padding:0 0.7rem;
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
</style>
