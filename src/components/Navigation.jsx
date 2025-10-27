import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navigation({ isLoggedIn = false }) {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const isAuthPage = location.pathname === '/auth';

  const showAuthLink = !isLoggedIn && (isLandingPage || isAuthPage);

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="nav-title-link">
          <h1 className="nav-title">
            L'art du vrai soi
          </h1>
        </Link>
        <div className="nav-links">
          <Link to="/gallery" className="nav-link">
            Gallery
          </Link>
          <Link to="/wishlist" className="nav-link">
            Wishlist
          </Link>
          {isLoggedIn ? (
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          ) : (
            showAuthLink && (
              <Link to="/auth" className="nav-link">
                Sign In / Sign Up
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
