import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  TextField,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";

const ShortenURLModal = ({ handleClose, createShortenLink }) => {
  const [Loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    longURL: "",
  });
  const [form, setForm] = useState({
    name: "",
    longUrl: "",
  });

  const handleChange = (event) => {
    setForm((oldForm) => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    const errors = {};
    const trimName = form.name.trim();
    const trimLongURL = form.longUrl.trim();

    var regExpression =
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
    var regex = new RegExp(regExpression);

    if (trimName.length <= 2) {
      errors.name = "Name should be more than 2 characters";
    }
    if (!regex.test(trimLongURL)) {
      errors.longURL = "URL is not valid";
    }

    if (!!Object.keys(errors).length) return setErrors(errors);
    setLoading(true);
    try {
      setTimeout(() => createShortenLink(trimName, trimLongURL), 1000);
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <Dialog open={true} onClose={handleClose} fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          Shorten URL
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box mb={3}>
          <TextField
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            variant="filled"
            label="Name"
            value={form.name}
            name="name"
            onChange={handleChange}
          />
        </Box>
        <TextField
          error={!!errors.longURL}
          helperText={errors.longURL}
          fullWidth
          variant="filled"
          label="Long URL"
          value={form.longUrl}
          name="longUrl"
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Box mr={2} my={1}>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disableElevation
            disabled={Loading}
          >
            {Loading ? (
              <CircularProgress color="inherit" size={21} />
            ) : (
              "Short it"
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ShortenURLModal;
