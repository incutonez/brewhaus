import { type Action, combineSlices, configureStore, type ThunkAction, type UnknownAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "@reduxjs/vue-redux";
import { breweriesStore } from "@/stores/breweries.ts";

export type AppThunk<TAction extends Action = UnknownAction> = ThunkAction<void, RootState, unknown, TAction>;

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector = useSelector.withTypes<RootState>();

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();

export const store = configureStore({
	reducer: combineSlices(breweriesStore),
});
