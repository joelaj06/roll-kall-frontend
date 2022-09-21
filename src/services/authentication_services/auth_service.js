import Endpoints from "./endpoints";
import HTTPClient from "../../api/http_client";

class AuthService {
    
  #client = new HTTPClient();

  login = async (body) => {
    const result = await this.#client.post(Endpoints.login, body);
    if(result){
        localStorage.setItem('access_token', `Bearer ${result.data.token}`);
    }
  };
}

export default AuthService;
