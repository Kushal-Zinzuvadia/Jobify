import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Include CSS for styling

const LoginPage = () => {
  const navigate = useNavigate();

  // Handlers for third-party authentication
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/oauth2/authorization/google"; // Update with your backend endpoint
  };

  React.useEffect(() => {
    if (window.location.pathname === "/login/success") {
      navigate("/home");  // Redirect to homepage after login
    }
  }, [navigate]);

  return (
    <div className="login-body">    
    <div className="login-container">
      <h1>Welcome to Jobify</h1>
      <p>Sign in to continue</p>

      <div className="login-buttons">
        <button className="google-login" onClick={handleGoogleLogin}>
          <img src="src/assets/google-logo.png" alt="Google Logo" />
          Sign in with Google
        </button>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
