import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  // Handlers for third-party authentication
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/oauth2/authorization/google"; // Update with your backend endpoint
  };

  React.useEffect(() => {
    if (window.location.pathname === "/login/success") {
      navigate("/home"); // Redirect to homepage after login
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-indigo-300 to-indigo-500">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-indigo-800 mb-4 text-center">
          Welcome to Jobify
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Sign in to continue
        </p>

        <button
          className="w-full flex items-center justify-center px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 transition duration-150"
          onClick={handleGoogleLogin}
        >
          <img
            src="src/assets/google-logo.png"
            alt="Google Logo"
            className="w-6 h-6 mr-2"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
