import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { snackBarPropType } from "../Types/components/index";

export default function CustomSnackBar({
  open,
  handleClose,
  severity,
  message,
}: snackBarPropType) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
