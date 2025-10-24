import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navigation />
        <div className="pt-20 p-6 text-white">
          {/* Future routes go here */}
        </div>
      </div>
    </Router>
  );
}

export default App;
