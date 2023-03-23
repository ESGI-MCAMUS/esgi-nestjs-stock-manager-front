import { createApi } from "@reduxjs/toolkit/query/react";
import { CACHE_KEY, endpoint, initialState, reducerPath } from "./constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { baseQuery } from "../api";
import { LoginRequest, LoginResponse, RegisterRequest, User } from "../models/application.model";
import { Order } from "../models/orders.model";
import { Supplier } from "../models/suppliers.model";

export const supplierApi = createApi({
  reducerPath,
  baseQuery,
  tagTypes: [CACHE_KEY],
  endpoints: (builder) => ({
    getAllSuppliers: builder.query<Supplier[], void>({
      query: () => ({
        url: `${endpoint.getAll}`,
        method: "GET",
      }),
    }),

    getOneSupplier: builder.query<Supplier, number>({
      query: (id) => ({
        url: `${endpoint.getOne(id)}`,
        method: "GET",
      }),
    }),

    createSupplier: builder.mutation<Supplier, Supplier>({
      query: (supplier) => ({
        url: `${endpoint.create}`,
        method: "POST",
        body: supplier,
      }),
    }),

    updateSupplier: builder.mutation<Supplier, Partial<Supplier>>({
      query: ({ id, ...supplier }) => ({
        url: `${endpoint.update(id!)}`,
        method: "PATCH",
        body: supplier,
      }),
    }),

    deleteSupplier: builder.mutation<Supplier, number>({
      query: (id) => ({
        url: `${endpoint.delete(id)}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    setSupplier: (state, action: PayloadAction<Supplier>) => {
      state = action.payload;
    }
  },
});

export const { setSupplier } =
  supplierSlice.actions;

export const { useGetAllSuppliersQuery, useGetOneSupplierQuery, useCreateSupplierMutation, useUpdateSupplierMutation, useDeleteSupplierMutation } = supplierApi;