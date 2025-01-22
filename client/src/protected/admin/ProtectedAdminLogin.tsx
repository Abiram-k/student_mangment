import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectLoginProps {
  children: React.ReactNode;
}

const ProtectAdminLogin: FC<ProtectLoginProps> = ({ children }) => {
  const isLoggedIn = useSelector((state: any) => state.admin.isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/student/admin" replace />;
  }
  return <>{children}</>;
};

export default ProtectAdminLogin;
