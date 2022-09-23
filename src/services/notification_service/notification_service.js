import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

class NotificationService {
  #toastConfig = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme : 'colored',
    
  };

  showSuccess = (message) => {
    console.log(message);
    return toast.success(message, this.#toastConfig);
  };

  showError = (message) => {
    return toast.error(message, this.#toastConfig);
  };

  showInfo = (message) => {
    toast.info(message, this.#toastConfig);
  };

  showWarning = (message) => {
    toast.warning(message, this.#toastConfig);
  };
}

export default NotificationService;
