import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectHomeProps {
  children: React.ReactNode;
}

const ProtectDashboard: FC<ProtectHomeProps> = ({ children }) => {
  const isLoggedIn = useSelector((state: any) => state.admin.isLoggedIn);
  if (isLoggedIn) {
    return <Navigate to="/student/admin/dashboard" replace />;
  }
  return <>{children}</>;
};
export default ProtectDashboard;
