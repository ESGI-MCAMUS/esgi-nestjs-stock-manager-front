import { createApi } from "@reduxjs/toolkit/query/react";
import { CACHE_KEY, endpoint, initialState, reducerPath } from "./constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { baseQuery } from "../api";
import { Product } from "../models/product.model";

export const productsApi = createApi({
  reducerPath,
  baseQuery,
  tagTypes: [CACHE_KEY],
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => ({
        url: `${endpoint.getAll}`,
        method: "GET",
      }),
    }),

    getOneProduct: builder.query<Product, number>({
      query: (id) => ({
        url: `${endpoint.getOne(id)}`,
        method: "GET",
      }),
    }),

    createProduct: builder.mutation<Product, Product>({
      query: (supplier) => ({
        url: `${endpoint.create}`,
        method: "POST",
        body: supplier,
      }),
    }),

    updateProduct: builder.mutation<Product, Partial<Product>>({
      query: ({ id, ...supplier }) => ({
        url: `${endpoint.update(id!)}`,
        method: "PATCH",
        body: supplier,
      }),
    }),

    deleteProduct: builder.mutation<Product, number>({
      query: (id) => ({
        url: `${endpoint.delete(id)}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSupplier: (state, action: PayloadAction<Product[]>) => {
      state = action.payload;
    }
  },
});

export const { setSupplier } =
  productsSlice.actions;

export const { useGetAllProductsQuery, useGetOneProductQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productsApi;