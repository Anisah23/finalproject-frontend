import React from "react";
import Navigation from "../components/Navigation";
import landingImage from "../assets/pasted-image.png"; // ensure this exists

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black overflow-hidden">
      {/* Navbar */}
      <Navigation />

      {/* Main Section */}
      <div className="flex flex-col flex-1 mt-0 pt-0">
        {/* Top section - image (70% height) */}
        <div
          className="h-[70vh] w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${landingImage})` }}
        >
          <div className="w-full h-full bg-black/25 flex items-center justify-center">
            <h1 className="text-white text-5xl md:text-7xl font-bold text-center drop-shadow-xl tracking-wide">
              L’art du <br /> monde entier
            </h1>
          </div>
        </div>

        {/* Bottom section - red (30% height) */}
        <div className="h-[30vh] flex flex-col items-center justify-center bg-[#260401] text-[#E5961E] text-center px-6">
          {/* Empty red section for balance */}
        </div>
      </div>
    </div>
  );
}
