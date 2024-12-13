import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store.ts";


interface ProtectedRoutesProps {
  children: React.ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({children}) => {
  const location = useLocation();
  const {accessToken} = useSelector((state: RootState) => state.auth);
  
  if(!accessToken) {
    return <Navigate to="/login" state={{from: location}} replace />;
  }
  
  return <>{children}</>
}

export default ProtectedRoutes;
