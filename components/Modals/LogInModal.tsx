'use client';

import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import {
  openLogInModal,
  closeLogInModal,
} from "@/features/modalAuth/authSlice";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { setUserInfo } from "@/features/infoUser/infoUserSlice";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "16px",
  boxShadow: 24,
  p: 4,
};

export default function LogInModal() {
  const { isOpenLogInModal } = useAppSelector((state) => state.authModal);
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogInModal = () => {
    dispatch(openLogInModal());
  };

  const handleClose = () => {
    dispatch(closeLogInModal());
  };

  const handleLogIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      dispatch(
        setUserInfo({
          userId: user.uid,
          username: user.displayName,
          email: user.email,
          password: password,
        })
      );
      handleClose();
      toast("Welcome back! You have logged in successfully.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
      });
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
      <Button
        sx={{ background: "green", color: "white" }}
        onClick={handleLogInModal}
      >
        Log In
      </Button>
      {isOpenLogInModal && (
        <Modal
          open={isOpenLogInModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
        >
          <Box sx={style}>
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
              }}
            >
              <CloseIcon />
            </IconButton>

            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              sx={{ fontWeight: "bold", mt: 3, mb: 3 }}
            >
              Log in to your account
            </Typography>

            <TextField
              fullWidth
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
              variant="outlined"
            />

            <TextField
              fullWidth
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "#F5A623",
                color: "white",
                borderRadius: "50px",
                py: 1.5,
                textTransform: "none",
                fontSize: "16px",
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "#E09000",
                },
              }}
              onClick={handleLogIn}
            >
              Sign Up
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
}
