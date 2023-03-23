import { Product } from "../models/product.model";
import { Supplier } from "../models/suppliers.model";

export const initialState: Product[] | null = null;

export const reducerPath = "productsApi";

export const CACHE_KEY = "Products";

export const endpoint = {
  getAll: "products",
  getOne: (id: number) => `products/${id}`,
  create: "products",
  update: (id: number) => `products/${id}`,
  delete: (id: number) => `products/${id}`,
};