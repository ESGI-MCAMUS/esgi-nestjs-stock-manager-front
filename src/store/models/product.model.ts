export interface Product {
  id: number;
  name: string;
  description: string;
  ean13: string;
  price: number;
  supplierId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CreateProduct {
  name: string;
  description: string;
  ean13: string;
  price: number;
  supplierId: number;
}