import { createSelector } from "reselect";
import { store } from "../store";


type RootState = ReturnType<typeof store.getState>;

const get = (state: RootState) => state.application;
export const applicationState = createSelector(
  get,
  (application) => application
);