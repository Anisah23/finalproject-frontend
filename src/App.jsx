import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import LandingPage from "./pages/LandingPage";
import "./App.css"; // Ensure you have Tailwind CSS set up

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navigation />
        <div className="pt-20 p-6 text-white">
          {/* Future routes go here */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
