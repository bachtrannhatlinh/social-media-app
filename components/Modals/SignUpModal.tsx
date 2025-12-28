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

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import {
  openSignUpModal,
  closeSignUpModal,
} from "@/features/modalAuth/authSlice";

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

export default function SignUpModal() {
  const { isOpenSignUpModal } = useAppSelector((state) => state.authModal);
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUpModal = () => {
    dispatch(openSignUpModal());
  };

  const handleClose = () => {
    dispatch(closeSignUpModal());
  };

  const handleCreateUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: username });

      handleClose();
      toast("Congratulations! Your account has been created successfully.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleSignUpModal}>
        Sign Up
      </Button>
      {isOpenSignUpModal && (
        <Modal
          open={isOpenSignUpModal}
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
              Create your account
            </Typography>

            <TextField
              fullWidth
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 2 }}
              variant="outlined"
            />

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
              onClick={handleCreateUser}
            >
              Sign Up
            </Button>

            <Typography
              sx={{ textAlign: "center", my: 2, color: "text.secondary" }}
            >
              Or
            </Typography>

            <Button
              fullWidth
              variant="outlined"
              sx={{
                borderColor: "#F5A623",
                color: "#F5A623",
                borderRadius: "50px",
                py: 1.5,
                textTransform: "none",
                fontSize: "16px",
                fontWeight: "bold",
                "&:hover": {
                  borderColor: "#E09000",
                  bgcolor: "rgba(245, 166, 35, 0.1)",
                },
              }}
            >
              Log In as Guest
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
}
