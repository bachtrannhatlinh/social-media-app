import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface CommentData {
  commentId: string;
  userId: string;
  username: string;
  displayName: string;
  content: string;
  avatarUrl?: string;
}

interface CommentModalState {
  isOpenCommentModal: boolean;
  isOpenUpdateCommentModal: boolean;
  isOpenDeleteCommentModal: boolean;
  commentData: CommentData | null;
}

const initialState: CommentModalState = {
  isOpenCommentModal: false,
  isOpenUpdateCommentModal: false,
  isOpenDeleteCommentModal: false,
  commentData: null,
};

export const commentSlice = createSlice({
  name: 'commentModal',
  initialState, 
  reducers: {
    // Comment Modal
    openCommentModal(state, action: PayloadAction<CommentData>) {     
      state.isOpenCommentModal = true;
      state.commentData = action.payload;
    },
    closeCommentModal(state) {
      state.isOpenCommentModal = false;
      state.commentData = null;
    },

    // Update Comment Modal
    openUpdateCommentModal(state, action: PayloadAction<CommentData>) {     
      state.isOpenUpdateCommentModal = true;
      state.commentData = action.payload;
    },
    closeUpdateCommentModal(state) {
      state.isOpenUpdateCommentModal = false;
      state.commentData = null;
    },

    // Delete Comment Modal
    openDeleteCommentModal(state, action: PayloadAction<CommentData>) {     
      state.isOpenDeleteCommentModal = true;
      state.commentData = action.payload;
    },
    closeDeleteCommentModal(state) {
      state.isOpenDeleteCommentModal = false;
      state.commentData = null;
    }
  },
});

export const {
  openCommentModal,
  closeCommentModal,
  openUpdateCommentModal,
  closeUpdateCommentModal,
  openDeleteCommentModal,
  closeDeleteCommentModal
} = commentSlice.actions;

export default commentSlice.reducer;