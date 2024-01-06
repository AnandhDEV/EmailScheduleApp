import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

function PreLoader({ open }: { open: boolean }) {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 10 }} open={open}>
      <CircularProgress color="primary" size="10vh" />
    </Backdrop>
  );
}

export default PreLoader;
