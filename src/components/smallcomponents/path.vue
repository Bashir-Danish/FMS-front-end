<script setup lang="ts">
import { Icon } from "@vicons/utils";
import { Apps20Regular } from "@vicons/fluent";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter, type RouteLocationNormalized } from "vue-router";

const pathText = ref("");
const subPathText = ref("");

const pathMap: { [key: string]: string } = {
  student: "لیست محلصین",
  enrolls: "نمرات",
  profile: "پروفایل",
  settings: "تنظیمات",
};

const subPathMap: { [key: string]: string } = {
  department: "دیپارتمنت",
  semester: "سمستر",
  subject: "مضامین",
  user: "کاربران",
};

const route = useRoute();
const router = useRouter();
router.afterEach((to) => {
  updatePathAndSubPath(to);
});

const updatePathAndSubPath = (route: RouteLocationNormalized) => {
  const segments = route.path.split("/").filter(Boolean);
  if (segments.length >= 2) {
    const [path, subPath] = segments;
    pathText.value = pathMap[path] || path;
    subPathText.value = subPathMap[subPath] || subPath;
  } else if (segments.length === 1) {
    pathText.value = pathMap[segments[0]] || segments[0];
    subPathText.value = "";
  } else {
    pathText.value = "خانه";
    subPathText.value = "";
  }
};

onMounted(() => {
  updatePathAndSubPath(route);
});
</script>
<template>
  <div class="path-part">
    <span class="icon">
      <Icon size="20">
        <Apps20Regular />
      </Icon>
    </span>
    <span class="divide">/</span>
    <span class="text">{{ pathText }}</span>
    <span v-if="subPathText" class="divide">/</span>
    <span v-if="subPathText" class="text">{{ subPathText }}</span>
  </div>
</template>




<style scoped lang="scss">
@import "@/assets/variables.scss";


.path-part {
    height: 1.8rem;
    direction: rtl;
    margin-right: 1em;
    padding-right: 2em;
    display: flex;
    color: $dOp-6;

    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3%;
        color: $dOp-4;


    }

    .divide {
        font-size: 1.3rem;
        padding-bottom: .15em;
        display: flex;
        align-items: center;
        color: $dOp-2;
        margin:0 1rem;
    }

    .text {
        // margin-right: 1rem;
        display: flex;
        align-items: center;
    }
}
</style>
  