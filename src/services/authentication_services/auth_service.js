import Endpoints from "./endpoints";
import HTTPClient from "../../api/http_client";
import jwtDecode from "jwt-decode";

class AuthService {

  constructor(){
    this.authenticated = false;
    this.checkTokenOnInit();
  }




  checkTokenOnInit(){
    let token = localStorage.getItem('access_token');
    if(token){
     this.authenticated = true;
    }
  }
    
  #client = new HTTPClient();

  login = async (body) => {
    const result = await this.#client.post(Endpoints.login, body);
    if(result){
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
    }
  };

  isAuthenticated = () => {
    return this.authenticated; 
  }
}

export default  AuthService;
