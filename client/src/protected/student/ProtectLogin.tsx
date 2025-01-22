import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectLoginProps {
  children: React.ReactNode;
}

const ProtectLogin: FC<ProtectLoginProps> = ({ children }) => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/student" replace />;
  }
  return <>{children}</>;
};

export default ProtectLogin;
