import React from "react";
import Navigation from "../components/Navigation";
import landingImage from "../assets/pasted-image.png";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <Navigation />

      <div className="landing-content">
        <div
          className="landing-hero"
          style={{ backgroundImage: `url(${landingImage})` }}
        >
          <div className="landing-hero-overlay">
            <h1 className="landing-title">
              L'art du <br /> monde entier
            </h1>
          </div>
        </div>

        <div className="landing-footer">
        </div>
      </div>
    </div>
  );
}
