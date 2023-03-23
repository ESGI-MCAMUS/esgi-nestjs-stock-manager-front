import { Order } from "../models/orders.model";

export const initialState: Order[] | null = null;

export const reducerPath = "ordersApi";

export const CACHE_KEY = "Orders";

export const endpoint = {
  getAll: "orders",
  getOne: (id: number) => `orders/${id}`,
  create: "orders",
  update: (id: number) => `orders/${id}`,
  delete: (id: number) => `orders/${id}`,
};