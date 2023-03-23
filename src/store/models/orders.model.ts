export interface Order {
  id: number;
  note: string;
  orderedBy: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
