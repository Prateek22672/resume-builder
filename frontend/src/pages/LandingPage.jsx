import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HERO_IMG from "../assets/hero-img.png"; // Adjust the path if needed
import Modal from "../components/Modal";
import Login from "../pages/Auth/Login.jsx";
import SignUp from "../pages/Auth/SignUp";
import { useContext } from "react";
import { UserContext } from "../context/userContext"; // Assuming you have a UserContext to manage user state
import ProfileInfoCard from "../components/Cards/ProfileInfoCard.jsx"; // Adjust the import path if needed
import { TypeAnimation } from 'react-type-animation';
import StarIcon from "../assets/gemini-color.svg"; // ✅ Make sure this path is correct
import { LuCloud, LuSparkles } from "react-icons/lu"; // Ensure this is at the top of your file



const LandingPage = () => {
  const { user } = useContext(UserContext); // Assuming you have a UserContext to manage user state
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
      setCurrentPage("login");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="w-full max-h-screen bg-white px-4 md:px-8 lg:px-16">
      {/* Header */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-6  bg-white">

        <div className="relative inline-flex items-start">
          {/* Icon Positioned Slightly Above and Left */}
          <img
            src={StarIcon}
            alt="AI Logo"
            className="w-5 h-5 absolute -top-2.5 -left-4.5 animate-pulse"
          />

          {/* Gradient Text */}
          <span className="text-lg font-bold text-transparent bg-clip-text 
                   bg-gradient-to-r from-purple-500 via-pink-500 to-gray-700">
            Ai Resume Builder
          </span>
        </div>



        {user ? <ProfileInfoCard /> : <button
          className="bg-purple-100 text-sm font-semibold text-black px-6 py-3 
                     rounded-lg hover:bg-gray-800 hover:text-white 
                     transition-colors cursor-pointer"
          onClick={() => setOpenAuthModal(true)}
        >
          Login / Sign Up
        </button>}
      </header>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center px-6 py-12 gap-12">
        <div className="w-full md:w-1/2">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            <div className="flex justify-center items-center gap-2 text-sm text-gray-700 mb-1">
              <img src={StarIcon} alt="AI Logo" className="w-4 h-4 animate-pulse" />
              <span className="font-medium text-transparent bg-clip-text bg-[linear-gradient(90deg,_#8b5cf6,_#ec4899,_#000000,_#ffffff)] bg-[length:300%_300%] animate-text-shine">
                Powered by AI
              </span>
            </div>
            <TypeAnimation
              sequence={[
                'Build Your Resume Effortlessly', // Text
                1000,                             // Delay after complete typing
              ]}
              wrapper="span"
              speed={0} // slower typing (higher number = slower speed)
              cursor={false}
              className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#7182ff_0%,_#3cff52_100%)] bg-[length:200%_200%] animate-text-shine"
            />
          </h1>


          <p className="text-gray-600 mb-6">
            <TypeAnimation
              sequence={[
                'Craft a standout resume in minutes with our smart and intuitive resume builder.',
                1000,
              ]}
              wrapper="span"
              speed={10}
              cursor={false}
              className="inline-block"
            />
          </p>


<button
  onClick={handleCTA}
  className="relative text-white font-semibold text-sm px-8 py-3 rounded-lg 
   bg-[radial-gradient(circle,#6EE7B7_0%,#3B82F6_50%,#9333EA_100%)]
   bg-[length:300%_300%] animate-text-shine
   transition-shadow duration-300 shadow-md hover:shadow-lg cursor-pointer">
  Get Started
</button>


        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={HERO_IMG}
            alt="Hero"
            className="max-w-lg w-full object-contain drop-shadow-md"
          />
        </div>
      </div>
      <section className="mt-5">

        <div className="flex flex-col items-center justify-center text-center mt-10 mb-30">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
<TypeAnimation
  sequence={[
    'Already have a resume?',
    1000,
  ]}
  wrapper="span"
  speed={0}
  cursor={false}
  className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 bg-[length:200%_200%] animate-text-shine"
/>

          </h1>

<button
  onClick={() => navigate("/resume-ai-refine")}
  className="relative text-white font-semibold text-sm px-8 py-3 rounded-lg 
   bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400
   bg-[length:300%_300%] animate-text-shine
   transition-shadow duration-300 shadow-md hover:shadow-lg cursor-pointer">
  Refine with AI
</button>

        </div>


        <h1 className="text-5xl font-bold mb-6 leading-tight">
          <TypeAnimation
            sequence={[
              'What Makes Us Different?', // Text
              1000,                             // Delay after complete typing
            ]}
            wrapper="span"
            speed={0} // slower typing (higher number = slower speed)
            cursor={false}
            className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#7182ff_0%,_#3cff52_100%)] bg-[length:200%_200%] animate-text-shine"
          />
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">


          {/* Easy Editing */}
          {/* AI SkillGap Analyzer */}
          <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 shadow-lg hover:shadow-xl transition transform hover:scale-105 cursor-pointer">
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <img src={StarIcon} alt="AI Icon" className="w-6 h-6 animate-pulse" />
                <h3 className="text-lg font-semibold text-gray-800">
                  AI SkillGap Analyzer
                </h3>
              </div>
              <p className="text-gray-600">
                Analyze your resume against job descriptions and identify missing skills instantly.
              </p>
            </div>
          </div>



          {/* Beautiful Templates */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-30 
                p-6 rounded-2xl shadow-md hover:shadow-lg transition transform hover:scale-105
                hover:bg-opacity-20">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Beautiful Templates
            </h3>
            <p className="text-gray-600">
              Choose from a variety of clean, professional, and customizable templates.
            </p>
          </div>


          {/* Cloud-Based Access */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition duration-300">
            <div className="flex items-center gap-3 mb-3">
              <LuCloud className="w-6 h-6 text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-800">Cloud-Based Access</h3>
            </div>
            <p className="text-gray-600">Access and edit your resume anytime, anywhere with secure cloud storage.</p>
          </div>


          {/* AI-Powered Intelligence */}
          <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-green-400 shadow-lg hover:shadow-xl transition transform hover:scale-105 cursor-pointer">
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <img src={StarIcon} alt="AI Icon" className="w-6 h-6 animate-pulse" />
                <h3 className="text-lg font-semibold text-gray-800">
                  AI-Powered Intelligence
                </h3>
              </div>
              <p className="text-gray-600">
                Created by Neural Magic and designed intelligently for the perfect resume.
              </p>
            </div>
          </div>
        </div>


      </section>


      <footer className="bg-gray-50 px-4 md:px-8 lg:px-16 py-6 mt-10 border-t border-gray-200 text-center">
        <div className="flex justify-center items-center gap-2 text-sm text-gray-700 mb-1">
          <img src={StarIcon} alt="AI Logo" className="w-4 h-4 animate-pulse" />
          <span className="font-medium text-transparent bg-clip-text bg-[linear-gradient(90deg,_#8b5cf6,_#ec4899,_#000000,_#ffffff)] bg-[length:300%_300%] animate-text-shine">
            Powered by AI
          </span>
        </div>

        <div className="text-sm text-gray-600">
          © {new Date().getFullYear()} <strong>Ai Resume Builder</strong> | <span className="font-semibold">Prateek™</span>. All rights reserved.
        </div>
      </footer>



      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>

    </div>
  );
};

export default LandingPage;