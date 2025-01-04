import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="home-container">
      {/* Navbar Section */}
      <nav className="navbar">
        <div className="navbar-left">
          <h1 className="navbar-title">Jobify</h1>
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
          <button
            className="navbar-button"
            onClick={() => handleNavigation("/jobs")}
          >
            Jobs
          </button>
          <button
            className="navbar-button"
            onClick={() => handleNavigation("/recruit")}
          >
            Recruit
          </button>
          <button
            className="navbar-button"
            onClick={() => handleNavigation("/login")}
          >
            Login
          </button>
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
