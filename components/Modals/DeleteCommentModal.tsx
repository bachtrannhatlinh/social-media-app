'use client';

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { deletePost } from "@/app/actions/post";
import { closeDeleteCommentModal } from "@/features/post/commentSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 320,
  maxWidth: "90vw",
  bgcolor: "background.paper",
  borderRadius: "16px",
  boxShadow: 24,
  p: 0,
  outline: "none",
};

export default function DeleteCommentModal() {
  const { isOpenDeleteCommentModal, commentData } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleClose = () => {
    dispatch(closeDeleteCommentModal());
  };

  const handleDelete = async () => {
    if (!commentData?.commentId) return;
    setIsDeleting(true);
    try {
      deletePost(commentData.commentId);
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setIsDeleting(false);
      handleClose();
    }
  };

  if (!isOpenDeleteCommentModal || !commentData) return null;
  return (
    <Modal
      open={isOpenDeleteCommentModal}
      onClose={handleClose}
      aria-labelledby="delete-comment-modal"
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          },
        },
      }}
    >
      <Box sx={style}>
        {/* Header with close button */}
        <Box sx={{ p: 2, pb: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <IconButton
            onClick={handleClose}
            sx={{ p: 0.5 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
            Delete Comment
          </Typography>
          <Box sx={{ width: 28 }} />
        </Box>

        {/* Content */}
        <Box sx={{ px: 3, pb: 2 }}>
          <Typography sx={{ fontSize: "15px", color: "#536471", textAlign: "center" }}>
            Are you sure you want to delete this comment? This action cannot be undone.
          </Typography>
        </Box>

        {/* Action buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            px: 3,
            pb: 3,
          }}
        >
          <Button
            variant="contained"
            onClick={handleDelete}
            disabled={isDeleting}
            sx={{
              bgcolor: "#F4212E",
              color: "white",
              borderRadius: "50px",
              py: 1.25,
              textTransform: "none",
              fontSize: "15px",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "#DC1D28",
              },
              "&.Mui-disabled": {
                bgcolor: "#F4212E",
                opacity: 0.5,
                color: "white",
              },
            }}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              borderColor: "#CFD9DE",
              color: "#0F1419",
              borderRadius: "50px",
              py: 1.25,
              textTransform: "none",
              fontSize: "15px",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "#F7F9F9",
                borderColor: "#CFD9DE",
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
