import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IBrewery } from "@/types/api.ts";
import type { ILoadingStatus } from "@/types/components.ts";

export interface IBreweriesState {
	records: IBrewery[];
	storeStatus: ILoadingStatus;
	activeRecord?: IBrewery;
}

const initialState: IBreweriesState = {
	records: [],
	storeStatus: "idle",
};

export const breweriesStore = createSlice({
	initialState,
	name: "breweries",
	reducers: {
		setBreweries(state, { payload }: PayloadAction<IBrewery[]>) {
			state.records = payload;
		},
		setStoreStatus(state, { payload }: PayloadAction<number>) {
			if (payload) {
				state.storeStatus = "loading";
			}
			else {
				state.storeStatus = "idle";
			}
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
			return state.storeStatus === "loading";
		},
	},
});

export const { setBreweries, setStoreStatus, setActiveBrewery } = breweriesStore.actions;

export const { getBreweryRecords, getActiveBreweryRecord, getLoadingStatus } = breweriesStore.selectors;
