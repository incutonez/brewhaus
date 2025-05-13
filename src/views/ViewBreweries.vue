<script setup lang="ts">
import { h, ref, watch } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseLink from "@/components/BaseLink.vue";
import FieldText from "@/components/FieldText.vue";
import { IconNext, IconPrevious, IconView } from "@/components/Icons.ts";
import LoadingMask from "@/components/LoadingMask.vue";
import TableData from "@/components/TableData.vue";
import { viewBrewery } from "@/router.ts";
import { getBreweryRecords, getLoadingStatus, loadBreweryRecords } from "@/stores/breweries.ts";
import { useAppDispatch, useAppSelector } from "@/stores/main.ts";
import type { IBrewery } from "@/types/api.ts";
import { useTableData } from "@/utils/table.ts";
import CellGoogleMap from "@/views/breweries/CellGoogleMap.vue";

const dispatch = useAppDispatch();
const searchValid = ref(true);
const page = ref(1);
const records = useAppSelector(getBreweryRecords);
const loading = useAppSelector(getLoadingStatus);
const { table, sorting, search } = useTableData<IBrewery>({
	serverSide: true,
	data: records,
	columns: [{
		id: "actions",
		header: "Actions",
		meta: {
			columnWidth: "w-auto",
			cellCls: "text-center",
		},
		cell(info) {
			return h(BaseButton, {
				theme: "table",
				icon: IconView,
				title: "View Brewery",
				onClick() {
					viewBrewery(info.row.original.id);
				},
			});
		},
	}, {
		accessorKey: "name",
		header: "Name",
	}, {
		accessorKey: "brewery_type",
		header: "Brewery Type",
	}, {
		accessorKey: "state_province",
		header: "Location",
		meta: {
			columnWidth: "w-auto",
		},
		cell: (info) => {
			return h(CellGoogleMap, {
				record: info.row.original,
			});
		},
	}, {
		accessorKey: "website_url",
		header: "Website",
		meta: {
			columnWidth: "w-auto",
		},
		cell: (info) => {
			return h(BaseLink, {
				url: info.getValue<string>(),
			});
		},
	}],
});

function onClickPrevious() {
	page.value--;
}

function onClickNext() {
	page.value++;
}

function onSearchEnd(value: string) {
	search.value = value;
}

watch([sorting, page, search], ([$sorting = [], $page, $search], [_$soringPrevious, _$pagePrevious, $searchPrevious]) => {
	if (!searchValid.value) {
		return;
	}
	// Reset the page whenever the search changes
	if ($search !== $searchPrevious && $page !== 1) {
		page.value = 1;
		// We return because this watcher will be triggered again from setting this
		return;
	}
	const [first] = $sorting;
	// If we set it as undefined, the property won't be sent in the request, which is what we want
	let sort = undefined;
	if (first) {
		sort = `${first.id}:${first.desc ? "desc" : "asc"}`;
	}
	dispatch(loadBreweryRecords({
		sort,
		page: $page,
		search: $search,
	}));
});

dispatch(loadBreweryRecords({}));
</script>

<template>
	<article class="size-full flex flex-col">
		<section class="justify-between flex space-x-2 p-2 relative">
			<section class="flex-1 flex space-x-4 justify-center items-center">
				<BaseButton
					:icon="IconPrevious"
					title="Previous Page"
					:disabled="page <= 1"
					@click="onClickPrevious"
				/>
				<span class="text-sm uppercase font-semibold text-gray-700">Page {{ page }} of ??</span>
				<BaseButton
					:icon="IconNext"
					title="Next Page"
					@click="onClickNext"
				/>
			</section>
			<section class="absolute right-2">
				<FieldText
					v-model:valid="searchValid"
					:model-value="search"
					label="Search"
					:minlength="3"
					@input-end="onSearchEnd"
				/>
			</section>
		</section>
		<TableData
			:table="table"
			class="flex-1"
		/>
		<LoadingMask v-if="loading" />
		<RouterView />
	</article>
</template>
