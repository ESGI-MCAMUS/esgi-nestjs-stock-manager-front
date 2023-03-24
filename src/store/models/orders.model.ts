import { Product } from "./product.model";

export interface Order {
  id: number;
  note: string;
  orderedBy: number;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CreateOrder {
  note: string;
  orderedBy: number;
  products: number[];
}
