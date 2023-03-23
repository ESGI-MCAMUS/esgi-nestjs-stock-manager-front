import { createSelector } from "reselect";
import { store } from "../store";


type RootState = ReturnType<typeof store.getState>;

const get = (state: RootState) => state.orders;
export const ordersState = createSelector(
  get,
  (orders) => orders
);