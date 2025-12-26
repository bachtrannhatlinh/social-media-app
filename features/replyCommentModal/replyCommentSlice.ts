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

interface ReplyCommentModalState {
  isOpen: boolean;
  commentData: CommentData | null;
}

const initialState: ReplyCommentModalState = {
  isOpen: false,
  commentData: null,
};

export const replyCommentSlice = createSlice({
  name: "replyCommentModal",
  initialState,
  reducers: {
    openReplyCommentModal(state, action: PayloadAction<CommentData>) {
      state.isOpen = true;
      state.commentData = action.payload;
    },
    closeReplyCommentModal(state) {
      state.isOpen = false;
      state.commentData = null;
    },
  },
});

export const { openReplyCommentModal, closeReplyCommentModal } =
  replyCommentSlice.actions;

export default replyCommentSlice.reducer;
