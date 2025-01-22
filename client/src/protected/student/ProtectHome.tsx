import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectHomeProps {
  children: React.ReactNode;
}

const ProtectHome: FC<ProtectHomeProps> = ({ children }) => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  if (isLoggedIn) {
    return <Navigate to="/student/home" replace />;
  }
  return <>{children}</>;
};
export default ProtectHome;
