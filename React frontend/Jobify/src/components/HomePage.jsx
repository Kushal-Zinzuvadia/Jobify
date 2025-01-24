import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    window.gapi.load("auth2", () => {
      const auth2 = window.gapi.auth2.init({
        client_id: "730888137190-ike7e86qjg8agldgpdu99la9svds5ru3.apps.googleusercontent.com", // Replace with your actual Google Client ID
      });

      // Check if the user is already signed in
      const currentUser = auth2.currentUser.get();
      setIsLoggedIn(currentUser.isSignedIn());
      setUser(currentUser.getBasicProfile());

      // Listen for sign-in state changes
      auth2.isSignedIn.listen((signedIn) => {
        setIsLoggedIn(signedIn);
        if (signedIn) {
          setUser(auth2.currentUser.get().getBasicProfile());
        } else {
          setUser(null);
        }
      });
    });
  }, []);

  const handleLogin = () => {
    window.gapi.auth2.getAuthInstance().signIn().then((googleUser) => {
      setIsLoggedIn(true);
      setUser(googleUser.getBasicProfile());
      localStorage.setItem("user", JSON.stringify(googleUser.getBasicProfile()));
      navigate("/login");
    });
  };

  const handleLogout = () => {
    window.gapi.auth2.getAuthInstance().signOut().then(() => {
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("user");
      navigate("/login");
    });
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="home-container">
      {/* Navbar Section */}
      <nav className="navbar">
        <div className="navbar-left">
          <span className="navbar-title">Jobify</span>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Opportunities"
              className="search-input"
            />
            <button className="search-icon">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        <div className="navbar-right">
          <button className="navbar-button" onClick={() => navigate("/jobs")}>
            Jobs
          </button>
          <button
            className="navbar-button"
            onClick={() => navigate("/recruit")}
          >
            Recruit
          </button>
          {isLoggedIn ? (
            <>
              <span className="profile-name" onClick={handleProfileClick}>
                {user ? user.getName() : ""}
              </span>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="login-button" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </nav>
      {/* Hero Section */}
      <header className="hero-section">
        <h1 className="hero-tagline">Discover Your Next Opportunity</h1>
        <p className="hero-subtext">
          Connecting talent with opportunities to shape the future.
        </p>
        <div className="hero-buttons">
          <button
            className="cta-button"
            onClick={() => handleNavigation("/jobs")}
          >
            Find Jobs
          </button>
          <button
            className="cta-button secondary"
            onClick={() => handleNavigation("/recruit")}
          >
            Post Jobs
          </button>
        </div>
      </header>

      {/* Key Features Section */}
      <section className="features-section">
        <h2 className="features-title">Why Choose Us?</h2>
        <div className="features-box">
          <div className="feature">
            <h3>Advanced Search Filters</h3>
            <p>
              Find your dream job using location, skills, and industry filters.
            </p>
          </div>
          <div className="feature">
            <h3>Personalized Recommendations</h3>
            <p>
              Get job suggestions tailored to your profile and preferences.
            </p>
          </div>
          <div className="feature">
            <h3>Secure and Trusted</h3>
            <p>
              Your data is safe with us, ensuring a seamless experience.
            </p>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="testimonials-title">Success Stories</h2>
        <div className="testimonials-container">
          <div className="testimonial-card">
            <p className="testimonial-text">
              &quot;Thanks to this platform, I landed my dream job in just two weeks!&quot;
            </p>
            <span className="testimonial-author">- Rahul, Software Engineer</span>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">
              &quot;As a recruiter, I found the perfect candidates effortlessly.&quot;
            </p>
            <span className="testimonial-author">- Priya, HR Manager</span>
          </div>
        </div>
      </section>


      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-links">
          <a href="/about-us">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/privacy-policy">Privacy Policy</a>
        </div>
        <p>&copy; 2025 Jobify. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
