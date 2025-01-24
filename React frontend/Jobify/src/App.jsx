import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import './App.css'
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

const App = () => { 
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App
