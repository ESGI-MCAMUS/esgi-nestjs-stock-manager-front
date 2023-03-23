import { Supplier } from "../models/suppliers.model";

export const initialState: Supplier | null = null;

export const reducerPath = "supplierApi";

export const CACHE_KEY = "Supplier";

export const endpoint = {
  getAll: "suppliers",
  getOne: (id: number) => `suppliers/${id}`,
  create: "suppliers",
  update: (id: number) => `suppliers/${id}`,
  delete: (id: number) => `suppliers/${id}`,
};