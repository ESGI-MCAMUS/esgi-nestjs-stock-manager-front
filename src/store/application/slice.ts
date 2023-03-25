import { createApi } from "@reduxjs/toolkit/query/react";
import { CACHE_KEY, endpoint, initialState, reducerPath } from "./constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { baseQuery } from "../api";
import { LoginRequest, LoginResponse, RegisterRequest, User } from "../models/application.model";
import { Order } from "../models/orders.model";

export const applicationApi = createApi({
  reducerPath,
  baseQuery,
  tagTypes: [CACHE_KEY],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (user) => ({
        url: `${endpoint.login}`,
        method: "POST",
        body: user,
      }),
    }),
    register: builder.mutation<User, RegisterRequest>({
      query: (user) => ({
        url: `${endpoint.register}`,
        method: "POST",
        body: user,
      }),
    }),
    getOrders: builder.query<Order[], number>({
      query: (id) => ({
        url: `${endpoint.orders(id)}`,
        method: "GET",
      }),
    }),
    getAllUsers: builder.query<User[], void>({
      query: () => ({
        url: `${endpoint.users}`,
        method: "GET",
      }),
    }),
  }),
});

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    disconnect: (state) => {
      state.user = null;
      state.token = null;
    }
  },
});

export const { setUser, setLoading, setToken, disconnect } =
  applicationSlice.actions;

export const { useLoginMutation, useRegisterMutation, useGetOrdersQuery, useGetAllUsersQuery } = applicationApi;