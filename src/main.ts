import "@/style.css";
import { createApp } from "vue";
import { provideStoreToApp } from "@reduxjs/vue-redux";
import App from "@/App.vue";
import { router } from "@/router.ts";
import { store } from "@/stores/main.ts";

const app = createApp(App);
provideStoreToApp(app, {
	store,
});
app.use(router);
app.mount("#app");
