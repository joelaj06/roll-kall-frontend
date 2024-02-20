import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class NotificationService {
  // #toastConfig = {
  //   position: "top-right",
  //   autoClose: 5000,
  //   hideProgressBar: true,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme : 'colored',
  //   toastId: toastId
  // };

  showSuccess = (message, toastId) => {
    const newToastConfig = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      toastId: toastId,
    };
    return toast.success(message, newToastConfig);
  };

  showError = (message, toastId) => {
    const newToastConfig = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      toastId: toastId,
    };
    return toast.error(message, newToastConfig);
  };

  showInfo = (message, toastId) => {
    const newToastConfig = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      toastId: toastId,
    };
    toast.info(message, newToastConfig);
  };

  showWarning = (message, toastId) => {
    const newToastConfig = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      toastId: toastId,
    };
    toast.warning(message, newToastConfig);
  };
}

export default NotificationService;
