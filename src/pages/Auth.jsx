import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import background from "../assets/login-bg.png"; 

export default function Auth() {
  const [role, setRole] = useState("collector");
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register, isAuthenticated, isArtist, isCollector } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      if (isArtist) {
        navigate('/artist/dashboard');
      } else if (isCollector) {
        navigate('/collector/dashboard');
      }
    }
  }, [isAuthenticated, isArtist, isCollector, navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const result = await login(formData.email, formData.password);
        if (result.success) {
          // Navigation will be handled by useEffect
        } else {
          setError(result.message);
        }
      } else {
        // Validation for signup
        if (!formData.full_name || !formData.email || !formData.password) {
          setError('All fields are required');
          return;
        }
        
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters long');
          return;
        }

        const result = await register({
          full_name: formData.full_name,
          email: formData.email,
          password: formData.password,
          role: role
        });
        
        if (result.success) {
          // Navigation will be handled by useEffect
        } else {
          setError(result.message);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

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
            type="button"
            onClick={() => setRole("artist")}
            className={`role-button ${role === "artist" ? "active" : "inactive"}`}
          >
            Artist
          </button>
          <button
            type="button"
            onClick={() => setRole("collector")}
            className={`role-button ${role === "collector" ? "active" : "inactive"}`}
          >
            Collector
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {/* Form Inputs */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <input
              type="text"
              name="full_name"
              placeholder="Full name"
              className="auth-input"
              value={formData.full_name}
              onChange={handleInputChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="auth-input"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="auth-input"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {mode === "signup" && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              className="auth-input"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? 'Please wait...' : 
              (mode === "login" ? `Login as ${role}` : `Sign up as ${role}`)}
          </button>
        </form>

        {/* Mode Switch */}
        <div className="auth-mode-switch">
          {mode === "login" ? (
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setError('');
                  setFormData({ full_name: '', email: '', password: '', confirmPassword: '' });
                }}
                className="auth-mode-link"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError('');
                  setFormData({ full_name: '', email: '', password: '', confirmPassword: '' });
                }}
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