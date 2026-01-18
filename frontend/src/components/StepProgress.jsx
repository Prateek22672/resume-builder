import React from 'react';

const StepProgress = ({ progress }) => {
  return (
    <div className="w-full h-[4px] bg-purple-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-purple-500/85 to-purple-700 transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default StepProgress;
