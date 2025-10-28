import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Navigation from "./components/Navigation";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Gallery from "./pages/Gallery";
import ArtistDashboard from "./pages/ArtistDashboard";
import CollectorDashboard from "./pages/CollectorDashboard";
import ArtistArtworks from "./pages/ArtistArtworks";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import "./App.css";

// Protected Route Component
function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, user, loading } = useAuth();
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

// App Routes Component
function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route 
        path="/auth" 
        element={isAuthenticated ? <Navigate to="/gallery" replace /> : <Auth />} 
      />
      
      {/* Shared Routes */}
      <Route 
        path="/gallery" 
        element={
          <ProtectedRoute>
            <Gallery />
          </ProtectedRoute>
        } 
      />
      
      {/* Artist Routes */}
      <Route 
        path="/artist/dashboard" 
        element={
          <ProtectedRoute requiredRole="artist">
            <ArtistDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/artist/artworks" 
        element={
          <ProtectedRoute requiredRole="artist">
            <ArtistArtworks />
          </ProtectedRoute>
        } 
      />
      
      {/* Collector Routes */}
      <Route 
        path="/collector/dashboard" 
        element={
          <ProtectedRoute requiredRole="collector">
            <CollectorDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/collector/cart" 
        element={
          <ProtectedRoute requiredRole="collector">
            <Cart />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/collector/wishlist" 
        element={
          <ProtectedRoute requiredRole="collector">
            <Wishlist />
          </ProtectedRoute>
        } 
      />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navigation />
          <div className="app-content">
            <AppRoutes />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
