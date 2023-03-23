import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { useSelector } from "react-redux";
import { env } from "../environments/local.env";
import { applicationState } from "./application/selector";
import { AppState } from "./store";

export const baseQuery = fetchBaseQuery({
  baseUrl: env.baseUrl,

  prepareHeaders: (headers, { getState }) => {
    const appState = getState() as AppState;
    const app = applicationState(appState);

    // If we have a token set in state, let's assume that we should be passing it.
    if (app) {
      app.token ? headers.set("Authorization", `Bearer ${app.token}`) : null;
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});