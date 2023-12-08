import "./assets/main.css";

import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import Vue3PersianDatetimePicker from "vue3-persian-datetime-picker";

const pinia = createPinia();
const app = createApp(App);


app.use(pinia);
app.component("DatePicker", Vue3PersianDatetimePicker);
app.use(router);

app.mount("#app");
