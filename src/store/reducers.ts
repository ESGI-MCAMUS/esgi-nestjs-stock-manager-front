import { applicationApi, applicationSlice } from "./application/slice";
import { ordersApi, ordersSlice } from "./order/slice";
import { productsApi, productsSlice } from "./product/slice";
import { supplierApi, supplierSlice } from "./supplier/slice";

export const reducers = {
  [applicationApi.reducerPath]: applicationApi.reducer,
  [applicationSlice.name]: applicationSlice.reducer,
  [supplierApi.reducerPath]: supplierApi.reducer,
  [supplierSlice.name]: supplierSlice.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [productsSlice.name]: productsSlice.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [ordersSlice.name]: ordersSlice.reducer,
} as const;