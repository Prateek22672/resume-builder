import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input.jsx"; // Adjust the import path if needed
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext"; // Assuming you have a UserContext to manage user state
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import { useContext } from "react"; // Import useContext to access UserContext



const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext); // Assuming you have a UserContext to manage user state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Login logic here

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    // Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        console.log("Saving token:", token); // ✅ Add this line to check in console
      localStorage.setItem("token", token); // ✅ This saves token to local storage
        updateUser(response.data);                      // Update user context
        navigate("/dashboard");                         // Redirect to dashboard
      }

    } catch (error) {
      // Handle error here (optional)
      if (error.response && error.response.data.message) {
        setError(error.response.data.message || "Login failed. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }


  };

  return (
    <div className="w-full  mx-auto px-2 py-6">
      <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
      <p className="text-l text-slate-700 mt-1 mb-6">
        Please enter your details to log in
      </p>

      <form onSubmit={handleLogin}>

        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="text"
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Enter Atleast 8 characters"
          type="password"
        />


        {error && (
          <p className="text-red-500 text-l pb-2.5">
            {error}
          </p>
        )}

        {/* You can add input fields here later */}

        <button
          type="submit"
          className="w-full text-center text-4l text-white font-semibold py-3 px-6 rounded-lg 
             bg-gradient-to-r from-[#A855F7] to-black 
             hover:from-[#7e22ce] hover:to-gray-900
             transition-all duration-[1000ms] ease-[cubic-bezier(0.4, 0, 0.2, 1)] cursor-pointer"
        >
          LOGIN
        </button>




        <p className="text-l mt-4 text-center cursor-pointer">
          Don’t have an account?{" "}
          <button
            type="button"
            className="text-purple-600 hover:underline cursor-pointer"
            onClick={() => setCurrentPage("signup")}
          >
            SignUp
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
