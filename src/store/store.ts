import { combineReducers, configureStore, isRejectedWithValue } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { Action, Middleware, MiddlewareAPI } from "redux";
import { reducers } from "./reducers";
import storage from 'redux-persist/lib/storage';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { applicationApi } from "./application/slice";
import { supplierApi } from "./supplier/slice";
import { productsApi } from "./product/slice";
import { ordersApi } from "./order/slice";


const combinedReducers = combineReducers({
  ...reducers,
});

const persistConfig = {
  key: "root",
  storage,
};

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.warn(action);
    }

    return next(action);
  };

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      rtkQueryErrorLogger,
      applicationApi.middleware,
      supplierApi.middleware,
      productsApi.middleware,
      ordersApi.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;