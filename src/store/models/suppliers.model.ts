export interface Supplier {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CreateSupplier {
  name: string;
  address: string;
  phone: string;
  email: string;
  userId: number;
}