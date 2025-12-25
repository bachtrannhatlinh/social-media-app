import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ModalAuthState {
  isOpenLogInModal: boolean;
  isOpenSignUpModal: boolean;
}

const initialState: ModalAuthState = {
  isOpenLogInModal: false,
  isOpenSignUpModal: false,
};

export const modalAuthSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    openLogInModal(state) {
      state.isOpenLogInModal = true;
    },
    closeLogInModal(state) {
      state.isOpenLogInModal = false;
    },
    openSignUpModal(state) {
      state.isOpenSignUpModal = true;
    },
    closeSignUpModal(state) {
      state.isOpenSignUpModal = false;
    }
  },
});

export const { openLogInModal, closeLogInModal, openSignUpModal, closeSignUpModal } = modalAuthSlice.actions

export default modalAuthSlice.reducer
