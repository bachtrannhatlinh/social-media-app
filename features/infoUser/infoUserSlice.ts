import { createSlice } from "@reduxjs/toolkit";

interface InfoUserState {
  userId: string | null;
  username: string | null;
  email: string | null;
  password: string | null;
}

const initialState: InfoUserState = {
  userId: null as string | null,
  username: null as string | null,
  email: null as string | null,
  password: null as string | null,
};


export const infoUserSlice = createSlice({
  name: "infoUser",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    clearUserInfo(state) {
      state.userId = null;
      state.username = null;
      state.email = null;
      state.password = null;
    },
  },
});

export const { setUserInfo, clearUserInfo } = infoUserSlice.actions;
export default infoUserSlice.reducer;