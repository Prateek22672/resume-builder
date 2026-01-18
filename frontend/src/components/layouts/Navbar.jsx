import React from "react";
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link, useNavigate } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";
import StarIcon from "../../assets/gemini-color.svg"; // ✅ Make sure this path is correct


const Navbar = () => {
  const navigate = useNavigate();

  return (
<div className="relative z-[50] h-16 bg-white/80 backdrop-blur-md shadow-sm px-4 flex items-center justify-between border-b border-gray-200">
      
      {/* Left: Back Button + Title */}
<div className="flex items-center gap-4">
  <button
    onClick={() => navigate(-1)}
className="bg-neutral-800 text-white p-2 rounded-full hover:bg-neutral-700 transition cursor-pointer"
    title="Go Back"
  >
    <LuArrowLeft className="w-5 h-5" />
  </button>

  <Link to="/dashboard" className="relative inline-flex items-start">
    {/* Icon Positioned Slightly Above and Left */}
    <img
      src={StarIcon}
      alt="AI Logo"
      className="w-5 h-5 absolute -top-2 -left-1 animate-pulse"
    />

    {/* Gradient Text */}
    <h2 className="text-l font-bold text-transparent bg-clip-text 
      bg-[radial-gradient(circle,#000000_0%,#9328E7_40%,#00d4ff_100%)] 
      bg-[length:200%_200%] animate-text-shine ml-4 mt-1">
      Ai Resume Builder
    </h2>
  </Link>
</div>


      {/* Right: Profile Avatar */}
      <ProfileInfoCard />
    </div>
  );
};

export default Navbar;
