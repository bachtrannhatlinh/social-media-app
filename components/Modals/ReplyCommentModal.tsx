'use client';

import * as React from "react";
import { useState } from "react";
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
import { closeReplyCommentModal } from "@/features/replyCommentModal/replyCommentSlice";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/config";

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

export default function ReplyCommentModal() {
  const { isOpen, commentData } = useAppSelector((state) => state.replyCommentModal);
  const dispatch = useAppDispatch();
  const [replyText, setReplyText] = useState("");

  const handleClose = () => {
    setReplyText("");
    dispatch(closeReplyCommentModal());
  };

  const handleSubmitReply = async() => {
    if (!replyText.trim()) return;
    try {
      await addDoc(collection(db, "comments"), {
        content: replyText,
        parentCommentId: commentData?.commentId,
        userId: commentData?.userId,
        username: commentData?.username,
        createdAt: serverTimestamp(),
      });
      setReplyText("");
    } catch (error) {
      console.error("Error adding reply comment:", error);
    } finally {
      handleClose();
    }
  };

  if (!isOpen || !commentData) return null;

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="reply-comment-modal"
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
        <Box sx={{ p: 2, pb: 1 }}>
          <IconButton
            onClick={handleClose}
            sx={{ p: 0.5 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content area with connecting line */}
        <Box sx={{ px: 2, pb: 2 }}>
          <Box sx={{ display: "flex" }}>
            {/* Left column: Avatars with connecting line */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mr: 1.5,
              }}
            >
              {/* Original comment avatar */}
              <Avatar
                src={commentData.avatarUrl}
                sx={{ width: 40, height: 40, bgcolor: "#e0e0e0" }}
              />
              {/* Connecting line */}
              <Box
                sx={{
                  width: 2,
                  flex: 1,
                  bgcolor: "#cfd9de",
                  my: 0.5,
                  minHeight: 40,
                }}
              />
              {/* Reply avatar */}
              <Avatar sx={{ width: 40, height: 40, bgcolor: "#e0e0e0" }} />
            </Box>

            {/* Right column: Content */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {/* Original comment section */}
              <Box>
                {/* Username row */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
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

                {/* Comment text */}
                <Typography sx={{ fontSize: "15px", mt: 0.5 }}>
                  {commentData.content}
                </Typography>

                {/* Replying to */}
                <Typography sx={{ fontSize: "15px", color: "#536471", mt: 1, mb: 2 }}>
                  Replying to{" "}
                  <Typography
                    component="span"
                    sx={{ color: "#F5A623", cursor: "pointer" }}
                  >
                    @{commentData.username}
                  </Typography>
                </Typography>
              </Box>

              {/* Reply input */}
              <InputBase
                placeholder="Send your reply"
                multiline
                fullWidth
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                sx={{
                  fontSize: "20px",
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
            onClick={handleSubmitReply}
            disabled={!replyText.trim()}
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
            Bumble
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
