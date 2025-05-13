import "@/style.css";
import { createApp } from "vue";
import { provideStoreToApp } from "@reduxjs/vue-redux";
import { VueQueryPlugin } from "@tanstack/vue-query";
import App from "@/App.vue";
import { router } from "@/router.ts";
import { store } from "@/stores/main.ts";

const app = createApp(App);
provideStoreToApp(app, {
	store,
});
app.use(VueQueryPlugin, {
	queryClientConfig: {
		defaultOptions: {
			queries: {
				refetchOnMount: false,
				refetchOnWindowFocus: false,
				staleTime: 120000,
			},
		},
	},
});
app.use(router);
app.mount("#app");
