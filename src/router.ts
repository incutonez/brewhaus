import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import ViewBreweries from "@/views/ViewBreweries.vue";
import ViewBrewery from "@/views/ViewBrewery.vue";

export const RouteHome = "home";

export const RouteBreweries = "breweries";

export const RouteBrewery = "brewery";

const routes: RouteRecordRaw[] = [{
	path: "/",
	name: RouteHome,
	redirect: {
		name: RouteBreweries,
	},
}, {
	path: "/breweries",
	name: RouteBreweries,
	component: ViewBreweries,
	children: [{
		path: ":breweryId",
		name: RouteBrewery,
		component: ViewBrewery,
		props: true,
	}],
}];

export const router = createRouter({
	routes,
	history: createWebHashHistory(),
});

export function viewBreweries() {
	return router.push({
		name: RouteBreweries,
	});
}

export function viewBrewery(breweryId: string) {
	return router.push({
		name: RouteBrewery,
		params: {
			breweryId,
		},
	});
}
