import { createApi } from "@reduxjs/toolkit/query/react";
import { CACHE_KEY, endpoint, initialState, reducerPath } from "./constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { baseQuery } from "../api";
import { Order } from "../models/orders.model";

export const ordersApi = createApi({
  reducerPath,
  baseQuery,
  tagTypes: [CACHE_KEY],
  endpoints: (builder) => ({
    getAllOrders: builder.query<Order[], void>({
      query: () => ({
        url: `${endpoint.getAll}`,
        method: "GET",
      }),
    }),

    getOneOrder: builder.query<Order, number>({
      query: (id) => ({
        url: `${endpoint.getOne(id)}`,
        method: "GET",
      }),
    }),

    createOrder: builder.mutation<Order, Order>({
      query: (supplier) => ({
        url: `${endpoint.create}`,
        method: "POST",
        body: supplier,
      }),
    }),

    updateOrder: builder.mutation<Order, Partial<Order>>({
      query: ({ id, ...supplier }) => ({
        url: `${endpoint.update(id!)}`,
        method: "PATCH",
        body: supplier,
      }),
    }),

    deleteOrder: builder.mutation<Order, number>({
      query: (id) => ({
        url: `${endpoint.delete(id)}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state = action.payload;
    }
  },
});

export const { setOrders } =
  ordersSlice.actions;

export const { useGetAllOrdersQuery, useGetOneOrderQuery, useCreateOrderMutation, useUpdateOrderMutation, useDeleteOrderMutation } = ordersApi;