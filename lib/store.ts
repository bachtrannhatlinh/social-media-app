import { configureStore } from "@reduxjs/toolkit";

import authModalReducer from "../features/modalAuth/authSlice";
import infoUserReducer from "../features/infoUser/infoUserSlice";
import postReducder from "../features/post/commentSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      authModal: authModalReducer,
      userInfo: infoUserReducer,
      post: postReducder
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
