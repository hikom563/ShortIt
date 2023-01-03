import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Box,
  Typography,
  TextField,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { auth } from "../../firebase";

const AuthModal = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [Error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setForm((oldForm) => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAuth = async () => {
    setLoading(true);
    try {
      if (isSignIn) {
        await auth.signInWithEmailAndPassword(form.email, form.password);
      } else {
        await auth.createUserWithEmailAndPassword(form.email, form.password);
      }
    } catch (err) {
      setError(err.code);
      setLoading(false);
    }
  };
  return (
    <Dialog open fullWidth onClose={onClose}>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {isSignIn ? "Sign in" : "Sign Up"}
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <TextField
          style={{ marginBottom: "24px" }}
          variant="filled"
          fullWidth
          value={form.email}
          name="email"
          onChange={handleChange}
          label="Email"
        />
        <TextField
          variant="filled"
          fullWidth
          value={form.password}
          name="password"
          onChange={handleChange}
          label="Password"
          type="password"
        />
        <Box mt={2} color="red">
          <Typography>{Error}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          mx={2}
          mb={1}
        >
          <Typography onClick={() => setIsSignIn((old) => !old)}>
            {isSignIn ? "Don't have an account?" : "Already have an account"}
          </Typography>
          <Button
            disableElevation
            variant="contained"
            color="primary"
            onClick={handleAuth}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="inherit" size={21} />
            ) : isSignIn ? (
              "Sign in"
            ) : (
              "Sign Up"
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AuthModal;
