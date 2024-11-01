import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Alert, Button, Snackbar } from "@mui/material";


export default function UserAlert({ msg, type, isOpen }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={msg}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
}

UserAlert.propTypes = {
  msg: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
