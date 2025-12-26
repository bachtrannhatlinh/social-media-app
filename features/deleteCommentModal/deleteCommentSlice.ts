import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CommentData {
  commentId: string;
  userId: string;
  username: string;
  displayName: string;
  content: string;
}

interface DeleteCommentModalState {
  isOpen: boolean;
  commentData: CommentData | null;
}

const initialState: DeleteCommentModalState = {
  isOpen: false,
  commentData: null,
};

export const deleteCommentSlice = createSlice({
  name: "deleteCommentModal",
  initialState,
  reducers: {
    openDeleteCommentModal(state, action: PayloadAction<CommentData>) {
      state.isOpen = true;
      state.commentData = action.payload;
    },
    closeDeleteCommentModal(state) {
      state.isOpen = false;
      state.commentData = null;
    },
  },
});

export const { openDeleteCommentModal, closeDeleteCommentModal } =
  deleteCommentSlice.actions;

export default deleteCommentSlice.reducer;
