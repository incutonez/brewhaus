import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { IBrewery, IPagination } from "@/types/api.ts";
import type { ILoadingStatus } from "@/types/components.ts";
import { sleep } from "@/utils/common.ts";

export interface IBreweriesState {
	records: IBrewery[];
	recordsStatus: ILoadingStatus;
	activeRecordStatus: ILoadingStatus;
	activeRecord?: IBrewery;
}

const initialState: IBreweriesState = {
	records: [],
	recordsStatus: "idle",
	activeRecordStatus: "idle",
};

export const breweriesStore = createSlice({
	initialState,
	name: "breweries",
	reducers: {
		setBreweries(state, { payload }: PayloadAction<IBrewery[]>) {
			state.records = payload;
		},
		setActiveBrewery(state, { payload }: PayloadAction<IBrewery | undefined>) {
			state.activeRecord = payload;
		},
	},
	selectors: {
		getBreweryRecords(state) {
			return state.records;
		},
		getActiveBreweryRecord(state) {
			return state.activeRecord;
		},
		getLoadingStatus(state) {
			return state.recordsStatus === "loading" || state.activeRecordStatus === "loading";
		},
	},
	extraReducers(builder) {
		builder.addCase(loadBreweryRecord.pending, (state) => {
			state.activeRecordStatus = "loading";
		});
		builder.addCase(loadBreweryRecord.rejected, (state) => {
			state.activeRecordStatus = "idle";
		});
		builder.addCase(loadBreweryRecord.fulfilled, (state, action) => {
			state.activeRecordStatus = "idle";
			breweriesStore.caseReducers.setActiveBrewery(state, action);
		});
		builder.addCase(loadBreweryRecords.pending, (state) => {
			state.recordsStatus = "loading";
		});
		builder.addCase(loadBreweryRecords.rejected, (state) => {
			state.recordsStatus = "idle";
		});
		builder.addCase(loadBreweryRecords.fulfilled, (state, action) => {
			state.recordsStatus = "idle";
			breweriesStore.caseReducers.setBreweries(state, action);
		});
	},
});

export const { setActiveBrewery } = breweriesStore.actions;

export const { getBreweryRecords, getActiveBreweryRecord, getLoadingStatus } = breweriesStore.selectors;

export const loadBreweryRecords = createAsyncThunk("breweries/loadBreweryRecords", async ({ perPage = 10, sort, page = 1, search }: IPagination) => {
	await sleep(1000);
	const { data } = await axios<IBrewery[]>({
		method: "get",
		url: "https://api.openbrewerydb.org/v1/breweries",
		params: {
			page,
			sort,
			per_page: perPage,
			by_name: search || undefined,
		},
	});
	return data;
});

export const loadBreweryRecord = createAsyncThunk("breweries/loadBreweryRecord", async (breweryId: string) => {
	await sleep(2000);
	const { data } = await axios<IBrewery>({
		method: "get",
		url: `https://api.openbrewerydb.org/v1/breweries/${breweryId}`,
	});
	return data;
});
