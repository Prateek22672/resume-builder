import React, { use, useEffect } from "react";
import { useState } from "react";
import { getLightColorFromImage } from "../../utils/helper";


const ResumeSummaryCard = ({ imgUrl, title, lastUpdated, onSelect }) => {

  const [bgColor, setBgColor] = useState("#ffffff");

  useEffect(() => {
    if (imgUrl) {
      getLightColorFromImage(imgUrl)
        .then((color) => {
          setBgColor(color);
        })
        .catch(() => {
          setBgColor("#ffffff"); // Fallback color
        });
    }
  }, [imgUrl]); // ✅ Move this closing bracket to the correct place

  return (
    <div
      className="h-[300px] flex flex-col items-center justify-between bg-white border border-purple-300 hover:border-purple-500 hover:bg-purple-50/10 cursor-pointer shadow-sm rounded-xl"
      style={{backgroundColor: bgColor}}
      onClick={onSelect}
    >
      <div className="p-4">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt=""
            className="w-[100%] h-[200px] rounded-xl"
          />
        ) : (
          <div></div>
        )}
      </div>

      <div className="w-full bg-white px-4 py-3 rounded-b-xl">
        <h5 className="text-sm font-medium truncate overflow-hidden whitespace-nowrap">
          {title}
        </h5>
        <p className="text-xs font-medium text-gray-500 mt-0.5">
          Last Updated: {lastUpdated}
        </p>
      </div>
    </div>
  );
};

export default ResumeSummaryCard;
