import React from "react";
import { useNavigate } from "react-router-dom";

const ResumeAIRefinePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 animate-shine">
         Page Under Maintenance 
      </h1>

      <p className="mb-8 text-lg text-gray-700 text-center max-w-md">
        We are improving this feature. Please check back soon for an enhanced AI resume refinement experience!
      </p>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-full shadow-md hover:scale-105 transition transform"
        >
          ← Back
        </button>

        <button
          onClick={() => navigate("/Dashboard")}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full shadow-md hover:scale-105 transition transform"
        >
          Create Resume
        </button>
      </div>

      <div className="w-full max-w-md">
        <input
          type="file"
          accept=".pdf"
          disabled
          className="w-full p-6 border-4 border-dashed border-gray-400 rounded-lg text-center text-gray-600 bg-white cursor-not-allowed"
        />
        <p className="text-sm text-gray-500 mt-2 text-center">
          PDF upload disabled during maintenance
        </p>
      </div>

      <style jsx="true">{`
        .animate-shine {
          background-size: 200% auto;
          animation: shine 3s linear infinite;
        }

        @keyframes shine {
          to {
            background-position: -200% center;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumeAIRefinePage;
