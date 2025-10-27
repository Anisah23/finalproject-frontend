import react from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Gallery from "./pages/Gallery";
import Wishlist from "./pages/Wishlist";
import CollectorDashboard from "./components/Collectorsdashboard";
import ArtistDashboard from "./components/Artistdashboard";
import "./App.css"; // Ensure you have Tailwind CSS set up
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
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/dashboard" element={<CollectorDashboard />} />
            <Route path="/artist-dashboard" element={<ArtistDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
