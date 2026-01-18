import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      if (setPreview) setPreview(preview);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (setPreview) setPreview(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center items-center mb-6 relative">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      <div className="relative w-24 h-24 rounded-full bg-purple-50 flex items-center justify-center">
        {!image ? (
          <>
            <LuUser className="text-3xl text-purple-600" />
            <button
              type="button"
              onClick={onChooseFile}
              className="absolute cursor-pointer -bottom-1 -right-2 w-11 h-11 rounded-full 
                flex items-center justify-center shadow-md z-10
                bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
            >
              <LuUpload className="text-white text-sm" />
            </button>
          </>
        ) : (
          <>
            <img
              src={preview || previewUrl}
              alt="profile"
              className="w-full h-full object-cover rounded-full"
            />

            {/* Upload button */}
            <button
              type="button"
              onClick={onChooseFile}
              className="absolute -bottom-2 -right-6 w-8 h-8 rounded-full 
                flex items-center justify-center shadow-md z-10
                bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
            >
              <LuUpload className="text-white text-sm" />
            </button>

            {/* Delete button */}
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-6 w-8 h-8 rounded-full 
                flex items-center justify-center shadow z-10
                bg-red-500 hover:bg-red-600 transition"
            >
              <LuTrash size={14} className="text-white" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoSelector;
