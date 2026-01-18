import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";


const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = React.useContext(UserContext); // Assuming you have a UserContext to manage user state

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");


    // 🔐 SignUp API Call


    try {

if (profilePic) {
  const imgUploadRes = await uploadImage(profilePic);
  profileImageUrl = imgUploadRes.imageUrl || "";
}


      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      // Optional: show error to user
    }
  }

  return (
    <div className="w-full max-w-md p-6 md:px-10 flex flex-col justify-start overflow-hidden">
      <h3 className="text-lg font-semibold text-black">Create an Account</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Join us today by entering your details below.
      </p>


      <form onSubmit={handleSignUp}>


        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />


        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John Wick"
            type="text"
          />

          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email"
            placeholder="johnwick@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Enter at least 8 characters"
            type="password"
          />
        </div>

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button
          type="submit"
          className="w-full text-center text-white font-semibold py-3 px-6 rounded-lg 
             bg-gradient-to-r from-[#A855F7] to-black 
             hover:from-[#7e22ce] hover:to-gray-900
             transition-all duration-[1000ms] ease-[cubic-bezier(0.4, 0, 0.2, 1)] cursor-pointer mt-6"
        >
          SIGN UP
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <button
            type="button"
            className="text-purple-600 hover:underline cursor-pointer"
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
