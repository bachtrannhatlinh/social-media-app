import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CommentData {
  commentId: string;
  userId: string;
  username: string;
  displayName: string;
  content: string;
  avatarUrl?: string;
}

interface UpdateCommentModalState {
  isOpen: boolean;
  commentData: CommentData | null;
}

const initialState: UpdateCommentModalState = {
  isOpen: false,
  commentData: null,
};

export const updateCommentSlice = createSlice({
  name: "updateCommentModal",
  initialState,
  reducers: {
    openUpdateCommentModal(state, action: PayloadAction<CommentData>) {
      state.isOpen = true;
      state.commentData = action.payload;
    },
    closeUpdateCommentModal(state) {
      state.isOpen = false;
      state.commentData = null;
    },
  },
});

export const { openUpdateCommentModal, closeUpdateCommentModal } =
  updateCommentSlice.actions;

export default updateCommentSlice.reducer;
