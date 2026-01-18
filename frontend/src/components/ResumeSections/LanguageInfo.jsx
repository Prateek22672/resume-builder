import React from "react";
import Progress from "../Progress";

const LanguageInfo = ({ language, progress, accentColor, bgColor }) => {
  return (
    <div>
      <p className="text-sm text-gray-800 font-medium">{language}</p>
      {progress > 0 && (
        <Progress
          progress={(progress / 100) * 5}
          color={accentColor}
          bgColor={bgColor}
        />
      )}
    </div>
  );
};

export default LanguageInfo;
