import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import StudentPortalLogin from "./pages/student/Login";
import { ROUTES } from "./routes";
import Home from "./pages/student/Home";
import ProtectLogin from "./protected/student/ProtectLogin";
import ProtectHome from "./protected/student/ProtectHome";
import StudentPortalSignUp from "./pages/student/SignUp";
import AdminPortalLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectDashboard from "./protected/admin/ProtectedDashboard";
import ProtectAdminLogin from "./protected/admin/ProtectedAdminLogin";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/student" />} />
          <Route
            path={ROUTES.LOGIN}
            element={
              <ProtectHome>
                <StudentPortalLogin />
              </ProtectHome>
            }
          />
          <Route
            path={ROUTES.SIGNUP}
            element={
              <ProtectHome>
                <StudentPortalSignUp />
              </ProtectHome>
            }
          />
          <Route
            path={ROUTES.HOME}
            element={
              <ProtectLogin>
                <Home />
              </ProtectLogin>
            }
          />

          <Route
            path={ROUTES.ADMIN}
            element={
              <ProtectDashboard>
                <AdminPortalLogin />
              </ProtectDashboard>
            }
          />

          <Route
            path={ROUTES.ADMIN_DASHBOARD}
            element={
              <ProtectAdminLogin>
                <AdminDashboard />
              </ProtectAdminLogin>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
