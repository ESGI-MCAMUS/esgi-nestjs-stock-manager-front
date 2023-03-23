import { createSelector } from "reselect";
import { store } from "../store";


type RootState = ReturnType<typeof store.getState>;

const get = (state: RootState) => state.supplier;
export const supplierState = createSelector(
  get,
  (supplier) => supplier
);