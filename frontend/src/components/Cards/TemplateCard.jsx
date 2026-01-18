import React from "react";

const TemplateCard = ({ thumbnailImg, isSelected, onSelect }) => {
  return (
    <div
      className={`h-auto md:h-[315px] flex flex-col items-center justify-between rounded-lg border ${isSelected ? "border-purple-500 border-2" : "border-gray-200"
        } hover:border-purple-300 overflow-hidden cursor-pointer transition-all duration-200`}
      onClick={onSelect}
    >
      {thumbnailImg ? (
        <img
          src={thumbnailImg}
          alt="Template preview"
          className="w-full h-full object-cover rounded"
        />
      ) : (
        <div>No Preview</div>
      )}
    </div>
  );
};

export default TemplateCard;
