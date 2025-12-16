import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ModalAuthState {
  isOpen: boolean;
}

const initialState: ModalAuthState = {
  isOpen: false,
};

export const modalAuthSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    openModal(state) {
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    }
  },
});

export const { openModal, closeModal } = modalAuthSlice.actions

export default modalAuthSlice.reducer
