import { configureStore } from "@reduxjs/toolkit";

import authModalReducer from "../features/modalAuth/authSlice";
import infouserReducer from "../features/infoUser/infoUserSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      authModal: authModalReducer,
      userInfo: infouserReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
