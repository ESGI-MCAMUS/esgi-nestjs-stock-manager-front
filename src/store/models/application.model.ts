export interface GenericApiReponse {
  title: string;
  message: string;
}

export type GenericApiReponseType = {
  title: string;
  message: string;
};

export interface App {
  user: User | null;
  loading: boolean;
  token: string | null;
}

export enum UserRoles {
  USER = "USER",
  SUPPLIER = "SUPPLIER",
  ADMIN = "ADMIN"
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  role: UserRoles;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}