import { ref, unref } from "vue";
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useVueTable } from "@tanstack/vue-table";
import type { IUseTableData } from "@/types/components.ts";

export function useTableData<TData = unknown>({ data, columns, sortInitial, searchInitial = "", serverSide = false }: IUseTableData<TData>) {
	const sorting = ref(sortInitial);
	const search = ref(searchInitial);
	const table = useVueTable({
		data,
		globalFilterFn: "includesString",
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		manualSorting: serverSide,
		get columns() {
			return unref(columns);
		},
		state: {
			get globalFilter() {
				return serverSide ? undefined : search.value;
			},
			get sorting() {
				return sorting.value;
			},
		},
		onSortingChange(updater) {
			sorting.value = updater instanceof Function ? updater(sorting.value ?? []) : updater;
		},
		onGlobalFilterChange(updaterOrValue) {
			search.value = typeof updaterOrValue === "function" ? updaterOrValue(search.value) : updaterOrValue;
		},
	});

	function getColumnSortIdentity(columnId: string) {
		let identity = 1;
		const $sorting = table.getState().sorting;
		if ($sorting) {
			identity = $sorting.find(({ id }) => id === columnId)?.desc ? 1 : -1;
		}
		return identity;
	}

	return {
		table,
		search,
		sorting,
		getColumnSortIdentity,
	};
}
