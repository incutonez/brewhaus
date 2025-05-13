import type { MaybeRef } from "vue";
import type {
	Cell as ITanStackCell,
	ColumnDef as ITanStackColumn,
	Header as ITanStackHeader,
	Row as ITanStackRow,
	SortingState as ITanStackSort,
	Table as ITanStackTable,
	TableOptionsWithReactiveData as ITanStackTableOptions,
} from "@tanstack/vue-table";

export type ITableOptions<TData = unknown> = ITanStackTableOptions<TData>;

export type ITable<TData = unknown> = ITanStackTable<TData>;

export type ITableRow<TData = unknown> = ITanStackRow<TData>;

export type ITableCell<TData = unknown, TValue = unknown> = ITanStackCell<TData, TValue>;

export type ITableHeader<TData = unknown, TValue = unknown> = ITanStackHeader<TData, TValue>;

export type ITableColumn<TData = unknown> = ITanStackColumn<TData>;

export type ITableSort = ITanStackSort;

export type ILoadingStatus = "loading" | "idle" | "error";

export interface IChangeEvent<T extends HTMLElement> extends Event {
	target: T;
}

export interface IUseTableData<TData = unknown> {
	data: MaybeRef<TData[]>;
	columns: MaybeRef<ITableColumn<TData>[]>;
	sortInitial?: ITableSort;
	searchInitial?: string;
	serverSide?: boolean;
}

export interface ITableData<TData = unknown> {
	table: ITable<TData>;
	rowCls?: string | ((row: ITableRow<TData>) => string);
	hideHeaders?: boolean;
	showSummary?: boolean;
}
