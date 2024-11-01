import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Alert, Snackbar } from "@mui/material";


export default function UserAlert({ msg = '', type = 'info', isOpen = false }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {msg}
      </Alert>
    </Snackbar>
  );
}

UserAlert.propTypes = {
  msg: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['error', 'warning', 'info', 'success']).isRequired,
  isOpen: PropTypes.bool.isRequired,
};
