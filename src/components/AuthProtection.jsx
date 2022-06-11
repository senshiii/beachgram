import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, redirectRoute }) => {
  const { isAuth } = useContext(AuthContext);

  const location = useLocation();

  if(!isAuth){
    return <Navigate to={redirectRoute} state={{from : location}} replace />
  }

  return children;
};

export default ProtectedRoute;
