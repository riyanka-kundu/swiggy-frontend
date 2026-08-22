import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "@/redux/slice/auth-slice";
import partnerReducer from "@/redux/slice/partner-slice";
import restaurantReducer from "@/redux/slice/restaurant-slice";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  auth: authReducer,
  partner: partnerReducer,
  restaurant: restaurantReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "partner", "restaurant"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
