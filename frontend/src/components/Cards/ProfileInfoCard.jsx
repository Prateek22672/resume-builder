import React, { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { LuPen } from "react-icons/lu";
import uploadImage from "../../utils/uploadImage";

const ProfileInfoCard = () => {
  const { user, clearUser, updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef();
  const fileInputRef = useRef();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const uploadRes = await uploadImage(file);
      const imageUrl = uploadRes.imageUrl;

      if (imageUrl) {
        const updatedUser = { ...user, profileImageUrl: imageUrl };
        updateUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error("Failed to upload profile image:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    user && (
      <div className="relative inline-block text-left z-[999]" ref={menuRef}>
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <div className="relative">
            {user.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                onError={(e) => (e.target.src = "/default-avatar.png")}
              />
            ) : (
              <div className="w-12 h-12 flex items-center justify-center bg-gray-200 text-black font-semibold text-sm rounded-full border-2 border-white shadow">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current.click();
              }}
              className="absolute bottom-0 right-0 bg-purple-600 p-1 rounded-full text-white text-xs hover:bg-purple-700 transition"
              title="Change Photo"
            >
              <LuPen size={12} />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <div className="text-lg font-bold">{user.name || ""}</div>
        </div>

        {openMenu && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-[9999]">
            <div className="px-4 py-2 text-sm text-gray-600 border-b">
              {user.email}
            </div>
            <ul className="text-sm text-gray-700">
              <li onClick={() => navigate("/")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Home</li>
              <li onClick={() => navigate("/dashboard")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Dashboard</li>
              <li onClick={() => navigate("/help")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Help & FAQ</li>
              <li onClick={handleLogout} className="px-4 py-2 hover:bg-gray-100 text-red-500 font-semibold cursor-pointer">Logout</li>
            </ul>
          </div>
        )}
      </div>
    )
  );
};

export default ProfileInfoCard;
