import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store.ts";
import {jwtDecode} from "jwt-decode";
import {Payload} from "@/interfaces/Payload.ts";

interface ProtectedRoutesProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({children, requiredRoles}) => {
  const location = useLocation();
  const {accessToken} = useSelector((state: RootState) => state.auth);

  if (!accessToken) {
    return <Navigate to="/login" state={{from: location}} replace/>;
  }

  const decodedToken = jwtDecode<Payload>(accessToken);

  if (decodedToken.rol === "USUARIO") {
    return <Navigate to="/public" replace/>;
  }

  if (requiredRoles && !requiredRoles.includes(decodedToken.rol)) {
    return <Navigate to="/" replace/>;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
