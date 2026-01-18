import React from "react";

const Progress = ({ progress = 0, total = 5, color, bgColor }) => {
  return (
    <div className="flex gap-1.5 mt-1">
      {[...Array(total)].map((_, index) => (
        <div
          key={index}
          className="w-2 h-2 rounded-full transition-all"
          style={{
            backgroundColor:
              index < progress
                ? color || "rgba(1,1,1,1)"
                : bgColor || "rgba(1,1,1,0.1)",
          }}
        ></div>
      ))}
    </div>
  );
};

export default Progress;
