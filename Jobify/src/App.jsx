import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { myAxios } from "./utils/user-service";
import HomePage from "./components/HomePage";
import Recruit from "./components/Recruit";
import Welcome from "./components/Welcome";
import Jobs from "./components/Jobs";
import AuthLogin from "./components/authLogin";
import PropTypes from "prop-types";
import AuthProfile from "./components/authProfile";

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired, 
};

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <Router> 
      <AuthHandler /> 
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/recruit" element={<ProtectedRoute element={<Recruit />} />} />
        <Route path="/welcome" element={<ProtectedRoute element={<Welcome />} />} />
        <Route path="/jobs" element={<ProtectedRoute element={<Jobs />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<AuthProfile />} />} />
      </Routes>
    </Router>
  );
};

// ✅ Create a separate component for authentication logic
const AuthHandler = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
    myAxios.defaults.headers.common["authorization"] = token;
    console.log(token);
  }, [navigate]);

  return null; // This component doesn’t render anything
};

export default App;
