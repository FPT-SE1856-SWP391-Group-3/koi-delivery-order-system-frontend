import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  const UserToast = (type, message) =>{

  if (!message) {
        console.warn('Toast message is required');
        return;
      }
    
      const toastConfig = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      };

    switch (type) {
      case "success":
        toast.success(message,toastConfig);
        break;
      case "error":
        toast.error(message, toastConfig);
        break;
      case "info":
        toast.info(message, toastConfig);
        break;
      case "warning":
        toast.warning(message, toastConfig);
        break;
      default:
        toast(message,toastConfig);
    }
};

export default UserToast;