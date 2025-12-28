'use client';

import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import InputBase from "@mui/material/InputBase";
import CloseIcon from "@mui/icons-material/Close";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { updatePost } from "@/app/actions/post";
import { closeUpdateCommentModal } from "@/features/post/commentSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxWidth: "90vw",
  bgcolor: "background.paper",
  borderRadius: "16px",
  boxShadow: 24,
  p: 0,
  outline: "none",
};

export default function UpdateCommentModal() {
  const { isOpenUpdateCommentModal, commentData } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();
  const [editText, setEditText] = useState("");

  useEffect(() => {
    if (commentData?.content) {
      setEditText(commentData.content);
    }
  }, [commentData]);

  const handleClose = () => {
    setEditText("");
    dispatch(closeUpdateCommentModal());
  };

  const handleSubmitUpdate = async () => {
    if (!editText.trim() || !commentData?.commentId) return;
    try {
      updatePost(editText, commentData.commentId);
      setEditText("");
    } catch (error) {
      console.error("Error updating comment:", error);
    } finally {
      handleClose();
    }
  };

  if (!isOpenUpdateCommentModal || !commentData) return null;
  return (
    <Modal
      open={isOpenUpdateCommentModal}
      onClose={handleClose}
      aria-labelledby="update-comment-modal"
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
            Edit Comment
          </Typography>
          <Box sx={{ width: 28 }} />
        </Box>

        {/* Content area */}
        <Box sx={{ px: 2, pb: 2 }}>
          <Box sx={{ display: "flex" }}>
            {/* Left column: Avatar */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mr: 1.5,
              }}
            >
              <Avatar
                src={commentData?.avatarUrl}
                sx={{ width: 40, height: 40, bgcolor: "#e0e0e0" }}
              />
            </Box>

            {/* Right column: Content */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {/* Username row */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "15px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "150px",
                  }}
                >
                  {commentData.displayName}
                </Typography>
                <Typography
                  sx={{
                    color: "#536471",
                    fontSize: "15px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "150px",
                  }}
                >
                  @{commentData.username}
                </Typography>
              </Box>

              {/* Edit input */}
              <InputBase
                placeholder="Update your comment"
                multiline
                fullWidth
                minRows={3}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                sx={{
                  fontSize: "18px",
                  "& .MuiInputBase-input::placeholder": {
                    color: "#536471",
                    opacity: 1,
                  },
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Bottom toolbar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
            borderTop: "1px solid #eff3f4",
          }}
        >
          {/* Action icons */}
          <Box sx={{ display: "flex", gap: 0.5, ml: 6 }}>
            <IconButton size="small" sx={{ color: "#F5A623" }}>
              <ImageOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: "#F5A623" }}>
              <BarChartOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: "#F5A623" }}>
              <SentimentSatisfiedOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: "#F5A623" }}>
              <CalendarTodayOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: "#F5A623" }}>
              <LocationOnOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Submit button */}
          <Button
            variant="contained"
            onClick={handleSubmitUpdate}
            disabled={!editText.trim() || editText === commentData.content}
            sx={{
              bgcolor: "#F5A623",
              color: "white",
              borderRadius: "50px",
              px: 3,
              py: 0.75,
              textTransform: "none",
              fontSize: "15px",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "#E09000",
              },
              "&.Mui-disabled": {
                bgcolor: "#F5A623",
                opacity: 0.5,
                color: "white",
              },
            }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
