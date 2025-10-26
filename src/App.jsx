import react from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <div className="app-content">
          {/* Future routes go here */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
