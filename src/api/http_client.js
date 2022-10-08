import axios from "axios";
import NotificationService from "../services/notification_service/notification_service";
class HTTPClient {
  #BASE_URL = "https://rollkall.onrender.com/api/";
  // for test
  #BASE_URL_LOCAL = "http://localhost:3000/api/";

  #notificationService = new NotificationService();

  constructor(){
    this.token = localStorage.getItem('access_token');
  }

  
  #client = axios.create({
    baseURL: this.#BASE_URL,
    headers: {
      "Content-type": "application/json",
      'Authorization': `${this.token}`
  },
    responseType: 'json'
  });


  get = async (endpoint) => {
    try {
      let response = await this.#client.get(endpoint, {
        headers : {
          'Authorization': `${this.token}`
        }
      });
      return response;
    } catch (err) {
      console.log(err);
      if(err.code === "ERR_NETWORK"){
        this.#notificationService.showError('Network Error Check Internet Connection');
        return null;
      }
      if (err.response.status !== 404) {
        const message = err.response.data.message;
        if (message) {
          if(message.toLowerCase().includes('authorized')){
            const newMessage = 'You need to Sign in to continue';
            this.#notificationService.showError(newMessage);
          }        }
      } else {
        this.#notificationService.showError("No Server Response");
      }
    }
  };

  put = async (endpoint, body) => {
    try {
      let response = await this.#client.put(endpoint, body);
      return response;
    } catch (err) {
      if (err.response.status !== 404) {
        const message =  err.response.data.message;
        if (message) {
          if(message.toLowerCase().includes('authorized')){
            const newMessage = 'You need to Sign in to continue';
            this.#notificationService.showError(newMessage);
          }
        }
      } else {
        this.#notificationService.showError("No Server Response");
      }
    }
  };
  post = async (endpoint, body) => {
    try {
      let response = await this.#client.post(endpoint, body);
      return response;
    } catch (err) {
      if (err.response.status !== 404) {
        const message = err.response.data.message;
        if (message) {
          this.#notificationService.showError(message);
        }
      } else  {
        this.#notificationService.showError("No Server Response");
      }
    }
  };
  delete = async (endpoint) => {
    try {
      let response = await this.#client.delete(endpoint);
      return response;
    } catch (err) {
      if (err.response.status !== 404) {
        const message = err.response.data.message;
        if (message) {
          this.#notificationService.showError(message);
        }
      } else {
        this.#notificationService.showError("No Server Response");
      }
    }
  };
}

export default HTTPClient;
