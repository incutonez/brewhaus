import { computed, type Ref, toRaw, unref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import axios from "axios";
import { setActiveBrewery, setBreweries } from "@/stores/breweries.ts";
import { useAppDispatch } from "@/stores/main.ts";
import type { IBrewery } from "@/types/api.ts";
import type { ITableSort } from "@/types/components.ts";
import { sleep } from "@/utils/common.ts";

export function useLoadBreweries(page: Ref<number>, perPage: Ref<number>, search: Ref<string | undefined>, sorting: Ref<ITableSort | undefined>, enabled: Ref<boolean>) {
	const dispatch = useAppDispatch();
	const sort = computed(() => {
		const [first] = unref(sorting) ?? [];
		// If we set it as undefined, the property won't be sent in the request, which is what we want
		let value = undefined;
		if (first) {
			value = `${first.id}:${first.desc ? "desc" : "asc"}`;
		}
		return value;
	});
	const query = useQuery({
		enabled,
		queryKey: [
			"breweries",
			page,
			perPage,
			search,
			sort,
		],
		async queryFn() {
			await sleep(1000);
			const { data } = await axios<IBrewery[]>({
				method: "get",
				url: "https://api.openbrewerydb.org/v1/breweries",
				params: {
					page: page.value,
					sort: sort.value,
					per_page: perPage.value,
					by_name: search.value || undefined,
				},
			});
			return data;
		},
	});

	// Update our state whenever the data changes AND the query is enabled
	watch([query.data, enabled], ([$data = [], $enabled]) => {
		if ($enabled) {
			dispatch(setBreweries(toRaw($data)));
		}
	});

	// If the search changes, we have to make sure we reset the page, otherwise, we could be stuck on a page with no results
	watch(search, ($search, $searchPrev) => {
		if ($search !== $searchPrev) {
			page.value = 1;
		}
	});

	return query;
}

export function useLoadBrewery(breweryId: Ref<string>) {
	const dispatch = useAppDispatch();
	const query = useQuery({
		// We don't want to cache getting a brewery by ID because we want this to be the absolute latest record
		staleTime: 0,
		gcTime: 0,
		queryKey: ["brewery", breweryId],
		async queryFn() {
			await sleep(2000);
			const { data } = await axios<IBrewery>({
				method: "get",
				url: `https://api.openbrewerydb.org/v1/breweries/${breweryId.value}`,
			});
			return data;
		},
	});

	watch(query.data, ($data) => dispatch(setActiveBrewery(toRaw($data))));

	return query;
}
