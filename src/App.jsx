import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import Recruit from "./components/Recruit";
import Jobs from "./components/Jobs";
// import JobSeekerDashboard from "./components/JobSeekerDashboard";
import Welcome from './components/Welcome';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recruit" element={<Recruit/>} />
        {/* <Route path="/dashboard" element={<JobSeekerDashboard/>} /> */}
        <Route path="/Welcome" element={<Welcome/>} />
        <Route path="Jobs" element={<Jobs/>} />
      </Routes>
    </Router>
  );
};

export default App
