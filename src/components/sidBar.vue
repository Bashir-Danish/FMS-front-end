<script setup lang="ts">
import { computed, ref, watch, reactive } from "vue";
import { mainStore } from "@/stores/main";
import { useRoute, useRouter } from "vue-router";
import { Icon } from "@vicons/utils";
import {
  CalendarPerson16Regular,
  ShoppingBag24Regular,
  Book20Regular,
  Settings16Regular,
  Apps20Regular,
  BookOpen48Regular,
  DocumentBulletList20Regular,
} from "@vicons/fluent";
import {
  IosArrowRoundBack,
  IosArrowRoundForward,
  IosArrowDown,
  IosArrowForward,
} from "@vicons/ionicons4";
import { HomeOutline, SchoolOutline, PersonOutline } from "@vicons/ionicons5";

const useMain = mainStore();
const route = useRoute();
const router = useRouter();

const iconMap: Record<string, any> = {
  home: HomeOutline,
  "shopping-bag": ShoppingBag24Regular,
  person: PersonOutline,
  settings: Settings16Regular,
  school: SchoolOutline,
  department: Apps20Regular,
  subject: Book20Regular,
  profile: CalendarPerson16Regular,
  semester: BookOpen48Regular,
  enroll: DocumentBulletList20Regular,
};

const items = ref<MenuItem[]>([
  { name: "Overview", link: "/", title: "خانه", icon: "home", open: false },
  {
    name: "student",
    link: "/student",
    title: "لیست محلصین",
    icon: "school",
    open: false,
  },
  {
    name: "enrollments",
    link: "/enrolls",
    title: "نمرات",
    icon: "enroll",
    open: false,
  },
  // {
  //   name: "attendances",
  //   link: "/attendances",
  //   title: "Attendances",
  //   icon: "attendance",
  //   open: false,
  // },

  {
    name: "profile",
    link: "/profile",
    title: "پروفایل",
    icon: "profile",
    open: false,
  },
  {
    name: "settings",
    link: "/settings",
    title: "تنظیمات",
    open: false,
    children: [
      {
        name: "departments",
        link: "/settings/department",
        title: "دیپارتمنت",
        icon: "department",
        open: false,
      },
      {
        name: "semesters",
        link: "/settings/semester",
        title: "سمستر",
        icon: "semester",
        open: false,
      },
      {
        name: "subjects",
        link: "/settings/subject",
        title: "مضامین",
        icon: "subject",
        open: false,
      },
      {
        name: "users",
        link: "/settings/user",
        title: "کاربران",
        icon: "person",
        open: false,
      },
    ],
    icon: "settings",
  },
]);
const getIcon = (iconName: string) => {
  return iconMap[iconName];
};
interface MenuItem {
  name: string;
  link: string;
  title: string;
  icon: string;
  open?: boolean;
  children?: MenuItem[];
}
const handleItemClick = (item: MenuItem) => {
  if (item.children && item.children.length > 0) {
    const index = items.value.findIndex((i) => i.name === item.name);
    const updatedItem = {
      ...items.value[index],
      open: !items.value[index].open,
    };
    items.value.splice(index, 1, updatedItem);
  } else {
    // items.value.forEach((menuItem) => {
    //   if (menuItem.children) {
    //     menuItem.open = false;
    //   }
    // });

    navigate(item.link);
  }
};

const closeAllChildren = () => {
  if (!useMain.sideBar) {
    items.value.forEach((item) => {
      item.open = false;
    });
  }
};
const isActive = computed(() => {
  const path =route.fullPath.split("/").filter(Boolean);
  if (path.length ==1) {
    return "/" + route.fullPath.split("/")[1]
  }  else if(path.length ==2) {
    return  "/" + route.fullPath.split("/")[1]+"/"+route.fullPath.split("/")[2];
  }else{
    return "/"
  }
});
const navigate = (link: string) => router.push(link);
</script>
<template>
  <aside class="sidebar" :class="{ 'sidebar-open': useMain.sideBar }" @mouseleave="closeAllChildren">
    <div :class="useMain.sideBar ? 'side-logo' : 'side-logo-2'">
      <div @click.native="useMain.sideBar = !useMain.sideBar" class="side-button">
        <Icon>
          <component :is="useMain.sideBar ? IosArrowRoundForward : IosArrowRoundBack" stroke-width="3"></component>
        </Icon>
      </div>
      <div class="brand">
        <p v-show="useMain.sideBar">FMS</p>
        <img src="@/assets/images/brand.png" alt="" srcset="" />
      </div>
    </div>
    <div class="side-items">
      <div v-for="item in items" :key="item.name" class="item">
        <div :class="{ active: isActive === item.link }" @click.native="handleItemClick(item)" class="item-details">
          <span class="arrow-icon" v-show="useMain.sideBar && item.children">
            <Icon>
              <component :is="item.open ? IosArrowDown : IosArrowForward" stroke-width="3"></component>
            </Icon>
          </span>
          <span class="icon-list" v-show="!useMain.sideBar">
            <Icon>
              <component :is="getIcon(item.icon)" stroke-width="2"></component>
            </Icon>
          </span>
          <h4 v-show="useMain.sideBar">
            {{ item.title }}
            <span>
              <Icon v-show="useMain.sideBar">
                <component :is="getIcon(item.icon)" stroke-width="2"></component>
              </Icon>
            </span>
          </h4>
        </div>
        <div v-show="useMain.sideBar" :class="item.open ? 'children' : 'close-child'">
          <div v-for="child in item.children" :key="child.name" class="child-item">
            <div @click.native="navigate(child.link)" :class="{ active: isActive === child.link }">
              <span v-show="useMain.sideBar">{{ child.title }}</span>
              <span class="item-icon">
                <Icon>
                  <component :is="getIcon(child.icon)" stroke-width="2"></component>
                </Icon>
              </span>
            </div>
          </div>
        </div>
        <Transition name="bounce"> </Transition>
        <div v-show="!useMain.sideBar" :class="item.open ? 'children2' : 'close-child2'">
          <div v-for="child in item.children" :key="child.name" class="child-item">
            <div @click.native="navigate(child.link)" :class="{ active: isActive === child.link }">
              <span>{{ child.title }}</span>
              <span class="item-icon">
                <Icon>
                  <component :is="getIcon(child.icon)" stroke-width="2"></component>
                </Icon>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style lang="scss">
@import "@/assets/variables.scss";
@import "@/assets/mixin.scss";

.sidebar.sidebar-open {
  right: 0;
}

.sidebar {
  width: 14rem;
  height: 100%;
  color: $dOp-7;
  position: fixed;
  top: 0;
  right: -9.5rem;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: end;
  z-index: 100;
  overflow: hidden;
  .side-logo {
    width: 100%;
    // height: 4rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .side-button {
      background-color: #fff;
      border-radius: 5px;
      font-size: 20px;
      width: 25px;
      height: 25px;
      border: 1px solid $dOp-1;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $dOp-2;
      margin: 0 1rem;
      cursor: pointer;
    }

    .brand {
      display: flex;
      align-items: center;
      margin: 1rem 2rem;

    }

    img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
    }
  }

  .side-logo-2 {
    width: 100%;
    height: 6rem;
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: start;

    .side-button {
      position: absolute;
      bottom: 0;
      left: 1.6rem;
      background-color: #fff;
      border-radius: 5px;
      font-size: 20px;
      width: 25px;
      height: 25px;
      border: 1px solid $dOp-1;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $dOp-2;
      cursor: pointer;
    }

    .brand {
      display: flex;
      align-items: center;
      color: $dOp-7;
      margin: 1rem 2rem;
    }

    img {
      position: absolute;
      top: 1.1rem;
      left: 1.1rem;
      border-radius: 50%;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
    }
  }


  .side-items {
    margin-top: 1.5rem;
    width: 95%;
    // margin-left: 1rem;

    .item {
      width: 95%;
      position: relative;
      display: flex;
      flex-direction: column;
      transition: all 0.25s ease;
      margin: 0.2em 0;
      color: $dOp-7;
      margin-right: 1rem;
      font-size: 15px;
      cursor: pointer;

      .item-details {
        padding: 0.5rem;
        display: flex;
        justify-content: start;
        align-items: center;
        border: 1px solid #00000000;
        transition: all 0.2s;

        .arrow-icon {
          margin: 0 0.5rem;
          display: flex;
        }

        .icon-list {
          display: flex;
          font-size: 1.4rem;
          padding: 0.2rem;
          margin-left: 0.2rem;
        }

        h4 {
          margin-right: 0.5rem;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: end;
          font-size: 1.1rem;

          span {
            margin-left: 0.4rem;
            font-size: 1.1rem;
            display: flex;
          }
        }

        &:hover {
          color: $primary;
          // backdrop-filter: blur(6px);
          // -webkit-backdrop-filter: blur(6px);
          // background-color: rgba(6, 9, 15, 0.019);
          // box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.001),
          //   -2px -2px 2px rgba(0, 0, 0, 0.038),
          //   -2px 2px 2px rgba(0, 0, 0, 0.038), 2px 2px 2px rgba(0, 0, 0, 0.038);
          // border-top: 1px solid $bgOp-6;
          // border-radius: 2rem;
        }

        &.active {

          
          color: $primary;
          
          background: rgba(255, 255, 255, 0.45);
          border-radius: 16px;
          // backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.001),
            -2px -2px 2px rgba(0, 0, 0, 0.038),
            -2px 2px 2px rgba(0, 0, 0, 0.038), 2px 2px 2px rgba(0, 0, 0, 0.038);
          border-radius: 2rem;
        }
      }

      .close-child {
        height: 0;
        opacity: 0;
        transition: max-height 0.25s ease-in-out, opacity 0.25s ease-in-out;
      }

      .close-child,
      .children {
        overflow: hidden;
        max-height: 0;
        transition: all 0.35s ease-in;

        // transition: max-height 0.25s ease-in-out, opacity 0.25s ease-in-out;
      }

      .children {
        max-height: 300px;
        transition: all 0.35s ease-in;
        margin-left: 1rem;
        display: flex;
        flex-direction: column;

        .child-item {
          padding: 0.3em 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: end;
          width: 100%;

          &:hover {
            color: $primary;
          }

          .icon-list {
            font-size: 1.2rem;
          }

          div {
            width: 100%;
            display: flex;
            justify-content: end;
            align-items: center;
            padding: 0.5rem;
            margin-right: 0.5rem;
            border: 1px solid #00000000;

            .item-icon {
              display: flex;
              font-size: 1.2rem;
            }

            span {
              margin-right: 0.5rem;
            }

            &.active {
              color: $primary;
              background: rgba(255, 255, 255, 0.45);
              border-radius: 16px;
              backdrop-filter: blur(5px);
              -webkit-backdrop-filter: blur(5px);
              // border: 1px solid rgba(255, 255, 255, 0.3);
              box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.001),
                -2px -2px 2px rgba(0, 0, 0, 0.038),
                -2px 2px 2px rgba(0, 0, 0, 0.038),
                2px 2px 2px rgba(0, 0, 0, 0.038);
              border-radius: 2rem;
            }
          }
        }
      }

      .close-child2 {
        height: 0;
        opacity: 0;
      }

      .children2 {
        position: absolute;
        left: -8rem;
        top: 0.5rem;
        background: rgba(255, 255, 255, 0.88);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-top: 1px solid $bgOp-6;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.001),
          -2px -2px 2px rgba(0, 0, 0, 0.038), -2px 2px 2px rgba(0, 0, 0, 0.038),
          2px 2px 2px rgba(0, 0, 0, 0.038);
        border-radius: 0.5rem;
        padding: 0.5rem;
        display: flex;
        flex-direction: column;

        .child-item {
          padding: 0.3rem 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: end;
          width: 100%;

          &:hover {
            color: $primary;
          }

          .icon-list {
            font-size: 1.2rem;
          }

          div {
            width: 100%;
            display: flex;
            justify-content: end;
            align-items: center;
            border-top: 1px solid #00000000;
            padding: 0 0 0.5em 0;

            .item-icon {
              display: flex;
              font-size: 1.2rem;
              margin-left: 0.5rem;
            }

            &.active {
              color: $primary;
              // backdrop-filter: blur(6px);
              // -webkit-backdrop-filter: blur(6px);
              // background-color: rgba(17, 25, 40, 0);
              // border-top: 1px solid $bgOp-6;
              // box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.001),
              //   -2px -2px 2px rgba(0, 0, 0, 0.038),
              //   -2px 2px 2px rgba(0, 0, 0, 0.038),
              //   2px 2px 2px rgba(0, 0, 0, 0.038);
              // border-radius: 2rem;
            }
          }
        }
      }
    }
  }
}
</style>
