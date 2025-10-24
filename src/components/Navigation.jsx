import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav
      className="w-full fixed top-0 left-0 z-50 bg-[#260401] border-b-[2px] border-[#E5961E] 
                 shadow-[0_0_20px_2px_#E5961E]/70"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-24 py-6">
        
        {/* Left Title */}
        <h1 className="text-[#E5961E] text-2xl font-serif font-semibold tracking-wide drop-shadow-[0_0_8px_#E5961E]">
          L’art du vrai soi
        </h1>

        {/* Auth Link */}
        <Link
          to="/auth"
          className="text-[#E5961E] text-base font-medium hover:text-white transition duration-300 drop-shadow-[0_0_6px_#E5961E]"
        >
          Sign In / Sign Up
        </Link>
      </div>
    </nav>
  );
}
