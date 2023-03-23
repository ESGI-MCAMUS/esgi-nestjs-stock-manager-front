import { App } from "../models/application.model";

export const initialState: App = {
  user: null,
  loading: false,
  token: null,
};

export const reducerPath = "applicationApi";

export const CACHE_KEY = "App";

export const endpoint = {
  login: "auth/login",
  register: "auth/register",
  orders: (id: number) => `users/${id}/orders`,
};