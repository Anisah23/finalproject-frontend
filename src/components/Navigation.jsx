import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navigation() {
  const { user, logout, isAuthenticated, isArtist, isCollector } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="nav-title-link">
          <h1 className="nav-title">
            L'art du vrai soi
          </h1>
        </Link>
        
        <div className="nav-links">
          {!isAuthenticated ? (
            <Link to="/auth" className="nav-link">
              Sign In / Sign Up
            </Link>
          ) : (
            <>
              <Link to="/gallery" className="nav-link">
                Gallery
              </Link>
              
              {isArtist && (
                <>
                  <Link to="/artist/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                  <Link to="/artist/artworks" className="nav-link">
                    My Artworks
                  </Link>
                  <Link to="/artist/orders" className="nav-link">
                    Orders
                  </Link>
                </>
              )}
              
              {isCollector && (
                <>
                  <Link to="/collector/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                  <Link to="/collector/wishlist" className="nav-link">
                    Wishlist
                  </Link>
                  <Link to="/collector/cart" className="nav-link">
                    Cart
                  </Link>
                  <Link to="/collector/orders" className="nav-link">
                    Orders
                  </Link>
                </>
              )}
              
              <Link to="/notifications" className="nav-link">
                Notifications
              </Link>
              
              <div className="nav-user">
                <span className="nav-username">Hello, {user?.full_name}</span>
                <button onClick={handleLogout} className="nav-logout">
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
