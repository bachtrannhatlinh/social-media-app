import { configureStore } from "@reduxjs/toolkit";

import authModalReducer from "../features/modalAuth/authSlice";
import infouserReducer from "../features/infoUser/infoUserSlice";
import replyCommentModalReducer from "../features/replyCommentModal/replyCommentSlice";
import updateCommentModalReducer from "../features/updateCommentModal/updateCommentSlice";
import deleteCommentModalReducer from "../features/deleteCommentModal/deleteCommentSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      authModal: authModalReducer,
      userInfo: infouserReducer,
      replyCommentModal: replyCommentModalReducer,
      updateCommentModal: updateCommentModalReducer,
      deleteCommentModal: deleteCommentModalReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
