import React, { useState } from "react";
import background from "../assets/login-bg.png"; // make sure this image exists

export default function Auth() {
  const [role, setRole] = useState("Collector");
  const [mode, setMode] = useState("login"); // "login" or "signup"

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 relative"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Soft overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>

      {/* Auth card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-lg border border-[#E5961E]/40 shadow-[0_0_20px_rgba(229,150,30,0.25)] rounded-2xl px-6 py-8 w-full max-w-sm text-center text-white">
        {/* Title */}
        <h2 className="text-2xl font-semibold mb-2 text-[#E5961E] tracking-wide">
          {mode === "login" ? "Welcome Back" : "Create an Account"}
        </h2>
        <p className="text-gray-300 mb-6 text-sm">
          {mode === "login"
            ? "Sign in to continue your journey"
            : "Join us and showcase your art to the world"}
        </p>

        {/* Role selection */}
        <div className="flex justify-center bg-[#1b1b1b]/70 rounded-full p-1 mb-5 border border-[#E5961E]/30">
          <button
            onClick={() => setRole("Artist")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
              role === "Artist"
                ? "bg-gradient-to-r from-[#E5961E] to-[#f8b13d] text-black"
                : "text-[#E5961E] hover:bg-[#E5961E]/10"
            }`}
          >
            Artist
          </button>
          <button
            onClick={() => setRole("Collector")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
              role === "Collector"
                ? "bg-gradient-to-r from-[#E5961E] to-[#f8b13d] text-black"
                : "text-[#E5961E] hover:bg-[#E5961E]/10"
            }`}
          >
            Collector
          </button>
        </div>

        {/* Form */}
        <form className="space-y-3">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full name"
              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-[#E5961E]/30 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E5961E]/40 focus:border-[#E5961E]"
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-[#E5961E]/30 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E5961E]/40 focus:border-[#E5961E]"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-[#E5961E]/30 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E5961E]/40 focus:border-[#E5961E]"
          />
          {mode === "signup" && (
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-[#E5961E]/30 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E5961E]/40 focus:border-[#E5961E]"
            />
          )}

          <button
            type="submit"
            className="w-full mt-3 py-2.5 rounded-lg bg-gradient-to-r from-[#E5961E] to-[#f8b13d] text-[#260401] font-semibold hover:shadow-[0_0_12px_rgba(229,150,30,0.4)] transition-all duration-300"
          >
            {mode === "login"
              ? `Login as ${role}`
              : `Sign up as ${role}`}
          </button>
        </form>

        {/* Links */}
        <div className="mt-5 text-sm text-gray-400">
          {mode === "login" ? (
            <p>
              Don’t have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-[#E5961E] hover:text-[#f8b13d] font-medium transition-all"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-[#E5961E] hover:text-[#f8b13d] font-medium transition-all"
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
