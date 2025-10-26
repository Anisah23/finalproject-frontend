import React, { useState } from "react";
import background from "../assets/login-bg.png"; 

export default function Auth() {
  const [role, setRole] = useState("Collector");
  const [mode, setMode] = useState("login"); 

  return (
    <div
      className="auth-container"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Overlay */}
      <div className="auth-overlay"></div>

      {/* Form Container */}
      <div className="auth-form-container">
        {/* Heading */}
        <h2 className="auth-heading">
          {mode === "login" ? "Welcome Back" : "Create an Account"}
        </h2>
        <p className="auth-subheading">
          {mode === "login"
            ? "Sign in to continue your journey"
            : "Join us and showcase your art to the world"}
        </p>

        {/* Artist/Collector Toggle */}
        <div className="role-toggle">
          <button
            onClick={() => setRole("Artist")}
            className={`role-button ${role === "Artist" ? "active" : "inactive"}`}
          >
            Artist
          </button>
          <button
            onClick={() => setRole("Collector")}
            className={`role-button ${role === "Collector" ? "active" : "inactive"}`}
          >
            Collector
          </button>
        </div>

        {/* Form Inputs */}
        <form className="auth-form">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full name"
              className="auth-input"
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
          />
          {mode === "signup" && (
            <input
              type="password"
              placeholder="Confirm password"
              className="auth-input"
            />
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="auth-submit"
          >
            {mode === "login" ? `Login as ${role}` : `Sign up as ${role}`}
          </button>
        </form>

        {/* Mode Switch */}
        <div className="auth-mode-switch">
          {mode === "login" ? (
            <p>
              Don’t have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="auth-mode-link"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="auth-mode-link"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
