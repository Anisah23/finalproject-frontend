import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="nav-title-link">
          <h1 className="nav-title">
            L'art du vrai soi
          </h1>
        </Link>
        <Link
          to="/auth"
          className="nav-link"
        >
          Sign In / Sign Up
        </Link>
      </div>
    </nav>
  );
}
