import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  // Redirect to home after successful login
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-indigo-300 to-indigo-500">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-indigo-800 mb-4 text-center">
          Welcome to Jobify
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Sign in to continue
        </p>

        {/* Auth0 Login */}
        <button
          className="w-full flex items-center justify-center px-4 py-3 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition duration-150"
          onClick={() => loginWithRedirect()}
        >
          Log in with Auth0
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
