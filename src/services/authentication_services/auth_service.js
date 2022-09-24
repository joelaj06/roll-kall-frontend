import Endpoints from "./endpoints";
import HTTPClient from "../../api/http_client";
import jwtDecode from "jwt-decode";

class AuthService {

  constructor(){
    this.authenticated = false;
    this.checkTokenOnInit();
  }


  token = undefined;

  checkTokenOnInit(){
    let token = localStorage.getItem('access_token');
    if(token){
     this.authenticated = true;
    }
  }
    
  #client = new HTTPClient();

  login = async (body) => {
    const result = await this.#client.post(Endpoints.login, body);
    console.log(result)
    if(typeof result !== 'undefined'){
        localStorage.setItem('access_token', `Bearer ${result.data.token}`);
        const token = localStorage.getItem('access_token');
        if(token){
          window.location.href = "/";
          const decodedToken = jwtDecode(token);
          console.log(decodedToken.exp);
          if(decodedToken.exp * 1000 < Date.now()){
            this.authenticated = false;
          }else{
            this.authenticated = true;
          }
        }
        return result.data;
    }else{
      return result;
    }
  };

  loadUserData = async () => {
    const user = await this.#client.get(Endpoints.user);
    if(user){
      return user;
    }
  }

  isAuthenticated = () => {
    return this.authenticated; 
  }

  getToken = () => {
    return this.token;
  }
}

export default  AuthService;
