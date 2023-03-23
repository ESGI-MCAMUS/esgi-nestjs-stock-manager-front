import { createSelector } from "reselect";
import { store } from "../store";


type RootState = ReturnType<typeof store.getState>;

const get = (state: RootState) => state.products;
export const productsState = createSelector(
  get,
  (products) => products
);