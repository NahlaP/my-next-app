
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { combineReducers } from "redux";

import authReducer from "./authSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist: ["auth", "cart", "product"],
  },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Only this, no concat(thunk)
    }),
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
