import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store/store";
import { hideNotification } from "~/store/slices/notificationSlice";
import React from "react";

const CustomAlert: React.FC = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector((state: RootState) => state.notification);

  const handleClose = () => {
    dispatch(hideNotification());
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export { CustomAlert }