import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  // Handle logout and redirect to the login page
  const handleLogout = () => {
    // Perform logout (you may want to clear any session or token here)
    // Example:
    // localStorage.removeItem("token");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <p>You are logged in!</p>

      <div className="home-buttons">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
