import React from "react";
import { Outlet, useNavigate} from "react-router-dom";
import AuthService from "../../services/authentication_services/auth_service";

const ProtectedRoute = () => {
  const authService = new AuthService();
  let navigate = useNavigate();
  return authService.isAuthenticated ? <Outlet/> : navigate('/'); 
    
};

export default ProtectedRoute;
